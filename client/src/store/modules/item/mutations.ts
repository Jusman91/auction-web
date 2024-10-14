import {
  MutationItemTypes,
  type IItem,
  type ItemState
} from '@/types';
import type { MutationTree } from 'vuex';

export const mutations: MutationTree<ItemState> = {
  [MutationItemTypes.SET_ITEMS](
    state: ItemState,
    { items, totalData }
  ) {
    state.items = items;
    state.totalData = totalData;
  },
  // [MutationItemTypes.SET_ITEM](
  //   state: ItemState,
  //   payload: IItem | null
  // ) {
  //   state.item = payload;
  // },
  // [MutationItemTypes.SET_CURRENT_BID](
  //   state: ItemState,
  //   payload: number
  // ) {
  //   state.currentBid = payload;
  // },
  [MutationItemTypes.SET_LOADING](
    state: ItemState,
    payload: boolean
  ) {
    state.loading = payload;
  },
  [MutationItemTypes.SET_ERROR](
    state: ItemState,
    payload: string | null
  ) {
    state.error = payload;
  }
};
