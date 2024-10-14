import {
  MutationModalTypes,
  type ModalState,
  type ModalType,
  type MutationsModal
} from '@/types';
import type { MutationTree } from 'vuex';

export const mutations: MutationTree<ModalState> & MutationsModal = {
  [MutationModalTypes.OPEN_MODAL](state, type: ModalType) {
    state.isOpenModals[type] = true;
  },
  [MutationModalTypes.CLOSE_MODAL](state, type: ModalType) {
    state.isOpenModals[type] = false;
  }
};
