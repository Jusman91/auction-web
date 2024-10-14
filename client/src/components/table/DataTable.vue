<script setup lang="ts">
import { useSearchParamsQuery } from '@/hooks/useSearchParams';
import { useTable } from '@/hooks/useTable';
import type { IDataTableProps } from '@/types/table';
import { PlusCircleFilled } from '@ant-design/icons-vue';
import { Button, Table, Tooltip } from 'ant-design-vue';
import { computed, ref } from 'vue';
import ExportDataTable from './ExportDataTable.vue';
import TableResetAllFilter from './TableResetAllFilter.vue';
import TableFilterByDate from './TableFilterByDate.vue';
import TableSearch from './TableSearch.vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['table-change']);
const {
  tableName,
  columns,
  data,
  totalData,
  loading,
  columnsToExport,
  fileName
} = defineProps<IDataTableProps>();
const router = useRouter();
const { queryParams } = useSearchParamsQuery();
const { tablePaginationConfig } = useTable();
const tableKey = ref(0);
const pagination = computed(() =>
  tablePaginationConfig(
    totalData,
    queryParams.page,
    queryParams.limit
  )
);
const onResetFilters = () => {
  router.push({ query: undefined }); // Reset semua query di URL
  tableKey.value++; // Trigger re-render table dengan mengganti key
};
</script>

<template>
  <div>
    {{ tableKey }}
    <div class="my-2 flex justify-between items-center relative">
      <div class="flex items-center gap-2">
        <Tooltip title="Add">
          <PlusCircleFilled
            class="text-xl text-blue-500 hover:text-blue-400 duration-150 cursor-pointer leading-[0]"
          />
        </Tooltip>
        <ExportDataTable
          :data="data"
          :columns-to-export="columnsToExport"
          :file-name="fileName"
        />
      </div>
      <div class="flex items-center gap-2">
        <TableResetAllFilter @reset-filters="onResetFilters" />
        <TableFilterByDate :tableName="tableName" />
        <TableSearch />
      </div>
    </div>
    <Table
      :key="tableKey"
      class="!h-[400px]"
      :scroll="{ x: 1500, y: 450 }"
      size="small"
      :data-source="data"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @change="
        (pagination, filters, sorter) =>
          emit('table-change', pagination, filters, sorter)
      "
    />
  </div>
</template>

<style scoped></style>
