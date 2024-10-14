import type { ModalState } from '@/types';
import { reactive } from 'vue';

export const state: ModalState = reactive({
  isOpenModals: {
    auth: false,
    user: false
  }
});
