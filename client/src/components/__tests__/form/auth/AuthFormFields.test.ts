import {
  getAuthFormFields,
  isAuthFormFieldHidden
} from '@/lib/utils';
import { createStore, Store } from 'vuex';

import { mount, shallowMount } from '@vue/test-utils';
import AuthFormFields from '@/components/form/auth/AuthFormFields.vue';
import type { AuthFormName } from '@/types';
import * as utils from '@/lib/utils';

// Mocking fungsi utility
// Mocking utility functions from '@/lib/utils'
vi.mock('@/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/utils')>();
  return {
    ...actual,
    // Mocking specific methods for the test
    getAuthFormFields: vi.fn((name: AuthFormName) => {
      return actual.getAuthFormFields(name);
    }),
    isAuthFormFieldHidden: vi.fn()
  };
});

describe('AuthForm.vue', () => {
  let store: Store<any>;
  const mockFieldItems = [
    {
      name: 'username',
      label: 'Username',
      rules: [],
      htmlFor: 'username'
    },
    {
      name: 'password',
      label: 'Password',
      rules: [],
      htmlFor: 'password'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    // Membuat Vuex store mock dengan modul form
    store = createStore({
      modules: {
        form: {
          state: {
            name: 'login',
            model: {
              email: '',
              password: ''
            }
          }
        }
      }
    });
  });

  const wrapper = () => {
    return mount(AuthFormFields, {
      global: {
        plugins: [store]
      }
    });
  };

  // Tes-tes akan dituliskan di sini
  it('should call getAuthFormFields with correct argument', () => {
    wrapper();

    expect(getAuthFormFields).toHaveBeenCalledWith('login');
  });

  it('should render fields correctly', () => {
    wrapper();
    const fields = ['email', 'password'];

    fields.forEach((field) => {
      const input = wrapper().find(`input#${field}`);
      expect(input.exists()).toBe(true);
    });
  });

  it('should hide fields correctly', () => {
    vi.spyOn(utils, 'isAuthFormFieldHidden').mockImplementation(
      ({ fieldName }) => {
        return (
          fieldName === 'name' ||
          fieldName === 'confirmPassword' ||
          fieldName === 'address' ||
          fieldName === 'phone' ||
          fieldName === 'termsAndConditions'
        );
      }
    );
    wrapper();

    const hiddenFields = [
      'name',
      'confirmPassword',
      'address',
      'phone',
      'termsAndConditions'
    ];
    hiddenFields.forEach((field) => {
      const input = wrapper().find(`input#${field}`);
      expect(input.exists()).toBe(false);
    });
  });

  it('should bind model value to input correctly', async () => {
    wrapper();

    // Simulasi perubahan input untuk username
    const usernameInput = wrapper().find('input#email');
    await usernameInput.setValue('testuser@gmali.com');

    // Periksa apakah model diperbarui dengan benar
    expect(store.state.form.model.email).toBe('testuser@gmali.com');
  });
});
