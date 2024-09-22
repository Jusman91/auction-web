import { axiosError, axiosInstance } from '@/lib/axios';
import type { IRegisterResponse, Register } from '@/types';

export default async function register(params: Register) {
  try {
    const { data } = await axiosInstance.post<IRegisterResponse>(
      '/auth/register',
      params
    );

    return data;
  } catch (error) {
    axiosError(error as Error);
  }
}
