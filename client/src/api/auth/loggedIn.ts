import { axiosError, axiosInstance } from '@/lib/axios';
import type { IUser } from '@/types';

export default async function loggedIn() {
  try {
    const { data } = await axiosInstance.get<IUser>('/auth/me');
    return data as IUser;
  } catch (error) {
    axiosError(error as Error);
  }
}
