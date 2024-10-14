import { fetchUsers } from '@/api';
import { QueryKeys, type IQueryParams } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/vue-query';

export const useFetchUsers = (queryParams: IQueryParams) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [QueryKeys.USERS, queryParams],
    queryFn: () => fetchUsers(queryParams),
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
