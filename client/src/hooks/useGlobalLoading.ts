import { computed } from 'vue';
import { useIsFetching, useMutationState } from '@tanstack/vue-query';

export const useGlobalLoading = () => {
  // Memantau query yang sedang fetching
  const isFetching = useIsFetching(); // Mengembalikan jumlah query yang sedang fetching

  // Memantau mutation dengan status 'pending'
  const mutationState = useMutationState({
    filters: { status: 'pending' },
    select: (mutation) => mutation.state.variables
  });

  // Menggabungkan state dari isFetching dan mutationState
  const isLoading = computed(() => {
    return isFetching.value > 0 || mutationState.value.length > 0;
  });

  return { isLoading };
};
