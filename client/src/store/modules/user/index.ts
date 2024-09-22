import type { RootState, UserState } from '@/types';
import type { Module } from 'vuex';
import { state } from './state';

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state
};
