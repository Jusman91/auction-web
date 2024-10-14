// src/test-utils.ts
import { render } from '@testing-library/vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import type { App, Component } from 'vue';

/**
 * Custom render function untuk @testing-library/vue
 * @param ui Komponen Vue yang akan dirender
 * @param options Opsi tambahan seperti store, router, dll.
 * @returns Hasil render dari @testing-library/vue
 */
const customRender = (
  ui: Component,
  {
    store = createStore({}),
    router = createRouter({
      history: createWebHistory(),
      routes: []
    }),
    ...options
  } = {}
) => {
  return render(ui, {
    global: {
      plugins: [store, router]
    },
    ...options
  });
};

// Export semua fungsi dari @testing-library/vue
export * from '@testing-library/vue';

// Export customRender sebagai render
export { customRender as render };
