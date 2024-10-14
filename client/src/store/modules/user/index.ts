import type { RootState, UserState } from '@/types';
import type { Module } from 'vuex';
import { state } from './state';
import { mutations } from './mutations';

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  mutations
};
