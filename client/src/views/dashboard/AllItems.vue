<script setup lang="ts">
import { Button } from '@/components/elements';
import DataTable from '@/components/table/DataTable.vue';
import { TableColumnItem } from '@/components/table/tableColumnItem';
import { useFetchCategories, useFetchItems } from '@/hooks';
import { useSearchParamsQuery } from '@/hooks/useSearchParams';
import { useTable } from '@/hooks/useTable';
import {
  exportToCSV,
  exportToExcel,
  exportToPDF
} from '@/lib/utils/exportData';
import { type ICategory, type IItem } from '@/types';
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
const { categories } = useFetchCategories();
const columnsItem = computed(() =>
  TableColumnItem(categories.value as ICategory[])
);
const { queryParams } = useSearchParamsQuery();
const { handleTableChange } = useTable();
const { data, isLoading, isFetching, error } =
  useFetchItems(queryParams);
const handleTableChangeItems = (
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult<IItem> | SorterResult<IItem>[]
) => {
  console.log('Pagination changed:', pagination);
  console.log('Filters applied:', filters);
  handleTableChange<IItem>({
    pagination,
    sorter,
    filters
  });
};
console.log(data.value?.data);
const columnsToExport = [
  'id',
  'name',
  'description',
  'startingBid',
  'currentBid',
  'category',
  'startTime',
  'endTime'
];
</script>

<template>
  <section>
    <h1>Items</h1>
    <DataTable
      table-name="table-item"
      :data="data?.data as IItem[]"
      :totalData="data?.totalData as number"
      :columns="columnsItem as ColumnsType<DataTableType>"
      v-on:table-change="handleTableChangeItems"
      :loading="isLoading || isFetching"
      :columns-to-export="columnsToExport"
      file-name="Data-Items"
    />
  </section>
</template>

<style scoped></style>
