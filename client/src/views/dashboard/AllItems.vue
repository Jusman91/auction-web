<script setup lang="ts">
import { Button } from '@/components/elements';
import DataTable from '@/components/table/DataTable.vue';
import { TableColumnItem } from '@/components/table/tableColumnItem';
import { useFetchCategories, useFetchItems } from '@/hooks';
import { useSearchParamsQuery } from '@/hooks/useSearchParams';
import { useTable } from '@/hooks/useTable';
import { getCollection } from '@/lib/realm/getCollection';
import { parseDateString } from '@/lib/utils';
import { buildSortCondition } from '@/lib/utils/builtSortCondition';
import {
  exportToCSV,
  exportToExcel,
  exportToPDF
} from '@/lib/utils/exportData';
import { useDispatch } from '@/store/helpers';
import {
  ActionItemTypes,
  type ActionItem,
  type ICategory,
  type IItem,
  type RootState
} from '@/types';
import type { DataTableType } from '@/types/table';
import type {
  ColumnsType,
  TablePaginationConfig
} from 'ant-design-vue/es/table';
import type {
  FilterValue,
  SorterResult
} from 'ant-design-vue/es/table/interface';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
const { categories } = useFetchCategories();
const columnsItem = computed(() =>
  TableColumnItem(categories.value as ICategory[])
);

const { queryParams } = useSearchParamsQuery();
const store = useStore<RootState>();
const { dispatch } = useDispatch<ActionItem>({
  store,
  namespace: 'item'
});
// const items = computed(() => store.state.item.items as IItem[]);
// const totalData = computed(() => store.state.item.totalData);
// const isLoading = computed(() => store.state.item.loading);
const { data, isLoading, isFetching, error } =
  useFetchItems(queryParams);

const { handleTableChange } = useTable();
// const { data, isLoading, isFetching, error } =
//   useFetchItems(queryParams);
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
// console.log(data.value?.data);
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
      :data="data?.items as IItem[]"
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
