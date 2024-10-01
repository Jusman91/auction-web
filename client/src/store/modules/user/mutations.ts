import type { IUser, UserState } from '@/types';

export const mutations = {
  SET_USER(state: UserState, user: IUser | null) {
    state.user = user;
  }
};
