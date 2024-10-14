import { axiosError, axiosInstance } from '@/lib/axios';
import type { IQueryParams, IResponseSuccess } from '@/types';

export default async function fetchIusers(params: IQueryParams) {
  try {
    const { data } = await axiosInstance.get('/users', { params });
    console.log(data);
    return data as IResponseSuccess;
  } catch (error) {
    axiosError(error as Error);
  }
}
