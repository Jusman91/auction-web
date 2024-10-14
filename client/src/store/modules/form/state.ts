import type { FormState } from '@/types/store';

export const state: FormState = {
  formRef: null,
  name: 'login',
  disabled: true,
  model: {
    email: '',
    password: ''
  }
};
