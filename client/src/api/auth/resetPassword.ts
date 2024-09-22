import { axiosError, axiosInstance } from '@/lib/axios';
import type { IResetPasswordResponse, ResetPassword } from '@/types';

export default async function resetPassword({
  formFields,
  id,
  token
}: ResetPassword) {
  try {
    const { data } = await axiosInstance.put<IResetPasswordResponse>(
      `/auth/reset-password/${id}/${token}`,
      formFields
    );
    return data;
  } catch (error) {
    axiosError(error as Error);
  }
}
