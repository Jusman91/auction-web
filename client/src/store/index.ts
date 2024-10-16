import type { RootState } from '@/types/store';
import { createStore } from 'vuex';
import { form } from './modules/form';
import { modal } from './modules/modal';
import { user } from './modules/user';
import { item } from './modules/item';

export const store = createStore<RootState>({
  modules: {
    form,
    modal,
    user,
    item
  }
});
