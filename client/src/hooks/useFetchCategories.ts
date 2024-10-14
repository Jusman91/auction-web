import { fetchCategories } from '@/api';
import { QueryKeys } from '@/types';
import { useQuery } from '@tanstack/vue-query';

export const useFetchCategories = () => {
  const { data: categories } = useQuery({
    queryKey: [QueryKeys.CATEGORIES],
    queryFn: fetchCategories,
    refetchOnWindowFocus: false
  });
  return {
    categories
  };
};
