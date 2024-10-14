import type { ItemState, RootState } from '@/types';
import type { Module } from 'vuex';
import { state } from './state';
import { mutations } from './mutations';
import { actions } from './actions';

export const item: Module<ItemState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};
