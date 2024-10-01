<script setup lang="ts">
import { useSearchParamsQuery } from '@/hooks/useSearchParams';
import { Input } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { queryParams } = useSearchParamsQuery();

const onSearch = (searchValue: string) => {
  console.log('use value', searchValue);
  if (searchValue.length > 0) {
    router.push({
      query: {
        ...route.query,
        search: searchValue
      }
    });
  } else {
    const { search, ...restQuery } = route.query; // Hapus query `search`
    router.push({
      query: {
        ...restQuery // Hanya query yang tersisa
      }
    });
  }
};
</script>

<template>
  <Input.Search
    size="small"
    class="w-full"
    placeholder="Search"
    :model:value="queryParams.search"
    @search="onSearch"
  />
</template>
