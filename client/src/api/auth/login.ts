import { axiosError, axiosInstance } from '@/lib/axios';
import type { ILoginResponse, Login } from '@/types';

export default async function login(params: Login) {
  try {
    const { data } = await axiosInstance.post<ILoginResponse>(
      '/auth/login',
      params
    );
    return data;
  } catch (error) {
    axiosError(error as Error);
  }
}
