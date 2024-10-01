import { fetchItems } from '@/api';
import { QueryKeys, type IQueryParams } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/vue-query';

export const useFetchItems = (queryParams: IQueryParams) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [QueryKeys.AUCTION_ITEMS, queryParams],
    queryFn: () => fetchItems(queryParams),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  });

  return {
    data,
    isLoading,
    isFetching,
    error
  };
};
