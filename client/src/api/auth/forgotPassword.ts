import { axiosError, axiosInstance } from '@/lib/axios';
import type {
  ForgotPassword,
  IForgotPasswordResponse
} from '@/types';

export default async function forgotPassword(params: ForgotPassword) {
  try {
    const { data } =
      await axiosInstance.post<IForgotPasswordResponse>(
        '/auth/forgot-password',
        params
      );
    return data;
  } catch (error) {
    axiosError(error as Error);
  }
}
