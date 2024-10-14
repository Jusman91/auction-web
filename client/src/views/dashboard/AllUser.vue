<script setup lang="ts">
import DataTable from '@/components/table/DataTable.vue';
import { TableColumnsUser } from '@/components/table/tableColumnsUser';
import { useFetchUsers } from '@/hooks';
import { useSearchParamsQuery } from '@/hooks/useSearchParams';
import { useTable } from '@/hooks/useTable';
import type { IUser } from '@/types';
import type { DataTableType } from '@/types/table';
import type {
  ColumnsType,
  TablePaginationConfig
} from 'ant-design-vue/es/table';
import type {
  FilterValue,
  SorterResult
} from 'ant-design-vue/es/table/interface';
import { computed } from 'vue';
const columnsUser = computed(() => TableColumnsUser());
const { queryParams } = useSearchParamsQuery();
const { handleTableChange } = useTable();
const { data, isLoading, isFetching, error } =
  useFetchUsers(queryParams);
const handleTableChangeItems = (
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult<IUser> | SorterResult<IUser>[]
) => {
  console.log('Pagination changed:', pagination);
  console.log('Filters applied:', filters);
  handleTableChange<IUser>({
    pagination,
    sorter,
    filters
  });
};
console.log(data.value?.data);
const columnsToExport = [
  'id',
  'name',
  'email',
  'phone',
  'address',
  'role'
];
</script>

<template>
  <section>
    <h1>Users</h1>
    <DataTable
      table-name="table-user"
      :data="data?.data as IUser[]"
      :totalData="data?.totalData as number"
      :columns="columnsUser as ColumnsType<DataTableType>"
      v-on:table-change="handleTableChangeItems"
      :loading="isLoading || isFetching"
      :columns-to-export="columnsToExport"
      file-name="data users"
    />
  </section>
</template>

<style scoped></style>
