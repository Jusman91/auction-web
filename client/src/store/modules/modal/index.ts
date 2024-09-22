import type { ModalState, RootState } from '@/types';
import type { Module } from 'vuex';
import { state } from './state';
import { mutations } from './mutations';

export const modal: Module<ModalState, RootState> = {
  namespaced: true,
  state,
  mutations
};
