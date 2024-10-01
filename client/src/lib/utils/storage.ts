import { StorageTypes, type IUser, type SaveUser } from '@/types';

export function saveAccessToken(accessToken: string) {
  return sessionStorage.setItem(
    StorageTypes.ACCESS_TOKEN,
    JSON.stringify(accessToken)
  );
}

export function getAccessToken() {
  const accessToken = sessionStorage.getItem(
    StorageTypes.ACCESS_TOKEN
  );
  return accessToken ? JSON.parse(accessToken) : '{}';
}

export function saveUser({ user }: SaveUser) {
  return sessionStorage.setItem(
    StorageTypes.USER,
    JSON.stringify(user)
  );
}

export function getUser(): IUser {
  const user = sessionStorage.getItem(StorageTypes.USER);
  return user ? JSON.parse(user) : {};
}

export function saveSelectedKeysDashboard(key: string) {
  sessionStorage.setItem(
    StorageTypes.SELECTED_KEYS,
    JSON.stringify([key])
  );
}

export function getSelectedKeysDashboard() {
  const key =
    sessionStorage.getItem(StorageTypes.SELECTED_KEYS) ||
    '["dashboard"]';
  return key ? JSON.parse(key) : '["dashboard"]';
}
