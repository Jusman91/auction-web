import { getUser } from '@/lib/utils';
import type { UserState } from '@/types';

export const state: UserState = {
  user: getUser() || null
};
