import { store } from '@/store';
import type { AuthFormName, IRulesAuth } from '@/types';
import { type Rule } from 'ant-design-vue/es/form';
import { computed } from 'vue';

const model = computed(() => store.state.form.model);

export const baseRules: IRulesAuth = {
  name: [
    { required: true, message: 'Please input your name!' },
    { min: 3 },
    { max: 15 },
    { whitespace: true }
  ],
  email: [
    { type: 'email' },
    { required: true, message: 'Please input your email!' }
  ],
  address: [
    { required: true, message: 'Please input your address!' },
    { max: 100 }
  ],
  phone: [
    {
      required: true,
      validator: async (_rule: Rule, value: string) => {
        if (value === '') {
          return Promise.reject('Please input your phone!');
        } else if (!/^\+62/.test(value)) {
          return Promise.reject('Phone number must start with +62');
        } else {
          return Promise.resolve();
        }
      }
    },
    { min: 10 },
    { max: 15 }
  ],
  password: [
    {
      required: true,
      // message: 'Please input your password!',
      validator: async (_rule: Rule, value: string) => {
        if (value === '') {
          return Promise.reject('Please input your password!');
        } else if (!/[a-z]/.test(value)) {
          return Promise.reject(
            'Password must contain at least one lowercase letter'
          );
        } else if (!/[A-Z]/.test(value)) {
          return Promise.reject(
            'Password must contain at least one uppercase letter'
          );
        } else if (!/\d/.test(value)) {
          return Promise.reject(
            'Password must contain at least one number'
          );
        } else {
          return Promise.resolve();
        }
      }
    },
    { min: 8 }
  ],
  confirmPassword: [
    {
      required: true,
      validator: async (_rule: Rule, value: string) => {
        const password = model.value?.password;
        if (value === '') {
          return Promise.reject('Please input the password again');
        } else if (value !== password) {
          return Promise.reject("Two inputs don't match!");
        } else {
          return Promise.resolve();
        }
      }
    }
  ],
  termsAndConditions: [
    {
      required: true,
      validator: async (_rule: Rule, value: boolean) => {
        if (!value) {
          return Promise.reject(
            'Please accept the terms and conditions!'
          );
        }
        return Promise.resolve();
      }
    }
  ]
};

export const getAuthFormValidations = (
  formName: AuthFormName
): IRulesAuth => {
  const rules = { ...baseRules };

  if (formName === 'login') {
    rules.password = [
      { required: true, message: 'Please input your password!' }
    ];
  }

  return rules;
};
