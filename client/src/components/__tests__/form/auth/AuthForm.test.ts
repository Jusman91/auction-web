// src/components/__tests__/form/auth/AuthForm.test.ts
import { mount, shallowMount } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import { MutationFormTypes } from '@/types';
import AuthForm from '@/components/form/auth/AuthForm.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('AuthForm', () => {
  let store: Store<any>;
  let commitSpy: any;
  let wrapper: any;

  beforeEach(() => {
    // Membuat spy untuk metode commit
    commitSpy = vi.fn();

    // Membuat store Vuex mock dengan spy pada commit
    store = createStore({
      modules: {
        form: {
          namespaced: true,
          state: {
            model: {
              username: '',
              password: ''
            }
          },
          mutations: {
            [MutationFormTypes.SET_FORM_REF]: vi.fn(),
            [MutationFormTypes.RESET_FIELDS]: vi.fn()
          },
          actions: {
            // Definisikan actions jika diperlukan
          }
        }
      }
      // Override metode commit dengan spy
      // Ini dilakukan dengan meng-spy pada metode commit setelah store dibuat
    });

    // Spy pada metode commit store
    vi.spyOn(store, 'commit').mockImplementation(commitSpy);

    // Mount komponen AuthForm dengan store Vuex mock
    wrapper = shallowMount(AuthForm, {
      global: {
        plugins: [store]
      },
      props: {
        name: 'authForm'
      }
    });
  });

  it('should commit SET_FORM_REF on mounted', () => {
    // Memastikan bahwa commit dipanggil dengan tipe dan payload yang benar saat mounted
    expect(commitSpy).toHaveBeenCalledWith(
      'form/SET_FORM_REF',
      wrapper.vm.$refs.formRef
    );
  });

  it('should commit RESET_FIELDS on before unmount', () => {
    // Simulasi unmount komponen
    wrapper.unmount();

    // Memastikan bahwa commit dipanggil dengan tipe yang benar saat unmount
    expect(commitSpy).toHaveBeenCalledWith(
      'form/RESET_FIELDS',
      undefined
    );
  });
});
