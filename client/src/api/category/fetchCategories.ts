import { axiosError, axiosInstance } from '@/lib/axios';
import type { ICategory } from '@/types';

export default async function fetchCategories() {
  try {
    const { data } = await axiosInstance.get('/categories');
    console.log(data);
    return data as ICategory[];
  } catch (error) {
    axiosError(error as Error);
  }
}
