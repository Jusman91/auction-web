// import { fetchItems } from '@/api';
import { getCollection } from '@/lib/realm/getCollection';
import { parseDateString } from '@/lib/utils';
import { buildSortCondition } from '@/lib/utils/builtSortCondition';
import { QueryKeys, type IQueryParams } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/vue-query';

const fetchItems = async (queryParams: IQueryParams) => {
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
      $gte: parseDateString(queryParams.startTime as string)
    };
  }

  if (queryParams.endTime) {
    matchStage.endTime = {
      $lte: parseDateString(queryParams.endTime as string)
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
  const data = results[0]?.data;

  return {
    items: data,
    totalData: metadata.total
  };
};
export const useFetchItems = (queryParams: IQueryParams) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [QueryKeys.AUCTION_ITEMS, queryParams],
    queryFn: () => fetchItems(queryParams),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  return {
    data,
    isLoading,
    isFetching,
    error
  };
};
