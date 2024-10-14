import type { IQueryParams } from '@/types';
import { computed, reactive, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

export function useSearchParamsQuery() {
  const route = useRoute();

  const search = computed(() => route.query?.search as string);
  const page = computed(() =>
    parseInt((route.query?.page as string) || '1', 10)
  );
  const limit = computed(() =>
    parseInt((route.query?.limit as string) || '10', 10)
  );
  const sort = computed(
    () => (route.query?.sort as string) || undefined
  );
  const order = computed(
    () => (route.query?.order as string) || undefined
  );
  const category = computed(
    () => (route.query?.category as string) || undefined
  );
  const startTime = computed(
    () => (route.query?.startTime as string) || undefined
  );
  const endTime = computed(
    () => (route.query?.endTime as string) || undefined
  );
  console.log(category.value);
  const queryParams = reactive<IQueryParams>({
    page: page.value,
    limit: limit.value,
    search: search.value,
    sort: sort.value,
    order: order.value,
    category: category.value,
    startTime: startTime.value,
    endTime: endTime.value
  });

  watchEffect(() => {
    queryParams.page = page.value;
    queryParams.limit = limit.value;
    queryParams.search = search.value;
    queryParams.sort = sort.value;
    queryParams.order = order.value;
    queryParams.category = category.value;
    queryParams.startTime = startTime.value;
    queryParams.endTime = endTime.value;
  });

  return {
    queryParams
  };
}
