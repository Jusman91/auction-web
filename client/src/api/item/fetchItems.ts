import { axiosError, axiosInstance } from '@/lib/axios';
import type { IQueryParams, IResponseSuccess } from '@/types';

export default async function fetchItems(params: IQueryParams) {
  try {
    const { data } = await axiosInstance.get('/items', { params });
    console.log(data);
    return data as IResponseSuccess;
  } catch (error) {
    axiosError(error as Error);
  }
}
