import type { FormState, RootState } from '@/types/store';
import type { Module } from 'vuex';
import { state } from './state';
import { mutations } from './mutations';
import { actions } from './actions';

export const form: Module<FormState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};
