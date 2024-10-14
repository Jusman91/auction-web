import {
  ActionFormTypes,
  MutationFormTypes,
  type ActionsForm,
  type FieldName,
  type FormState,
  type RootState
} from '@/types';
import type { NamePath } from 'ant-design-vue/es/form/interface';
import type { ActionTree } from 'vuex';

export const actions: ActionTree<FormState, RootState> & ActionsForm =
  {
    async [ActionFormTypes.ENABLED_BUTTON](
      { state, commit },
      fields?: string | NamePath[] | undefined
    ) {
      const formRef = state.formRef;
      if (formRef) {
        try {
          await formRef.validate(fields);
          commit(MutationFormTypes.SET_DISABLED, false);
        } catch (error) {
          console.log('Validation failed');
          // Disable button if validation fails
          commit(MutationFormTypes.SET_DISABLED, true);
        }
      }
    }
  };
