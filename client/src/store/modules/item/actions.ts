import { getCollection } from '@/lib/realm/getCollection';
import { parseDateString } from '@/lib/utils';
import { buildSortCondition } from '@/lib/utils/builtSortCondition';
import {
  ActionItemTypes,
  MutationItemTypes,
  type ItemState,
  type RootState
} from '@/types';
import type { ActionTree } from 'vuex';

export const actions: ActionTree<ItemState, RootState> = {
  async [ActionItemTypes.GET_ITEMS]({ commit }, queryParams) {
    commit(MutationItemTypes.SET_LOADING, true);
    try {
      const itemCollection = await getCollection(
        'auction',
        'AuctionItem'
      );

      const skip = (queryParams.page - 1) * queryParams.limit;
      const matchStage: any = {};

      if (queryParams.search) {
        matchStage.$or = [
          { name: { $regex: queryParams.search, $options: 'i' } },
          {
            description: { $regex: queryParams.search, $options: 'i' }
          }
        ];
      }

      if (queryParams.category) {
        matchStage.category = queryParams.category;
      }

      if (queryParams.startTime) {
        matchStage.startTime = {
          $gte: parseDateString(queryParams.startTime)
        };
      }

      if (queryParams.endTime) {
        matchStage.endTime = {
          $lte: parseDateString(queryParams.endTime)
        };
      }
      const sortCondition = buildSortCondition({
        sort: queryParams.sort,
        order: queryParams.order
      });

      const pipeline: any[] = [{ $match: matchStage }];

      if (sortCondition) {
        pipeline.push({ $sort: sortCondition });
      }

      pipeline.push({
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { page: queryParams.page } }
          ],
          data: [{ $skip: skip }, { $limit: queryParams.limit }]
        }
      });

      const results = await itemCollection.aggregate(pipeline);
      const metadata = results[0]?.metadata[0] || {
        total: 0,
        page: 1
      };
      const data = results[0]?.data || [];

      commit(MutationItemTypes.SET_ITEMS, {
        items: data,
        totalData: metadata.total
      });
    } catch (error) {
      console.error('Error fetching items:', error);
      commit(MutationItemTypes.SET_ERROR, 'An error occurred');
    } finally {
      commit(MutationItemTypes.SET_LOADING, false);
    }
  }
};
