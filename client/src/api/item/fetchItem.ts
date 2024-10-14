import { axiosError, axiosInstance } from '@/lib/axios';
import type { IItem } from '@/types';

export default async function (slug: string) {
  try {
    const { data } = await axiosInstance.get(`/items/${slug}`);
    return data as IItem;
  } catch (error) {
    axiosError(error as Error);
  }
}
