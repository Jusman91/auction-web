import type { IUser } from './api';

export enum StorageTypes {
  THEME = 'theme',
  ACCESS_TOKEN = 'accessToken',
  IS_AUTHENTICATED = 'isAuthenticated',
  USER = 'user',
  SELECTED_KEYS = 'selectedKeys'
}

export type SaveUser = {
  user: IUser;
};
