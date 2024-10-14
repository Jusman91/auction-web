// import { fetchItem } from '@/api';
import { QueryKeys, type IItem } from '@/types';
import { getCollection } from '@/lib/realm/getCollection';
import { useQuery } from '@tanstack/vue-query';

// export const useFetchItem = (slug: string) => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: [QueryKeys.AUCTION_ITEM, slug],
//     queryFn: () => fetchItem(slug),
//     enabled: !!slug,
//     retry: 1,
//     refetchOnWindowFocus: false
//   });

//   return { data, isLoading, isError };
// };

// Fetcher function untuk useQuery
const fetchItem = async (slug: string) => {
  try {
    const collection = await getCollection('auction', 'AuctionItem');
    const item = await collection.findOne({ slug });

    if (!item) throw new Error('Item tidak ditemukan');
    return item as IItem;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};
export const useFetchItem = (slug: string) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [QueryKeys.AUCTION_ITEM, slug],
    queryFn: () => fetchItem(slug),
    enabled: !!slug,
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isLoading, isError, refetch };
};
