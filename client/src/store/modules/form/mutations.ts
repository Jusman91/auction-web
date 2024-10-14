import {
  MutationFormTypes,
  type FormModel,
  type FormName,
  type FormState
} from '@/types';
import type { FormInstance } from 'ant-design-vue';
import type { MutationTree } from 'vuex';

export const mutations: MutationTree<FormState> = {
  [MutationFormTypes.SET_NAME](state, payload: FormName) {
    state.name = payload;
  },
  [MutationFormTypes.SET_FORM_REF](
    state,
    payload: FormInstance | null
  ) {
    state.formRef = payload;
  },
  [MutationFormTypes.SET_MODEL](state, payload: FormModel) {
    Object.assign(state.formRef?.model || {}, payload);
  },
  [MutationFormTypes.SET_DISABLED](state, payload: boolean) {
    state.disabled = payload;
  },
  [MutationFormTypes.RESET_FIELDS](state) {
    if (state.formRef) {
      state.formRef.resetFields();
    } else {
      console.error('Form ref is not initialized yet');
    }
  }
};
