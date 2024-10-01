<script setup lang="ts">
import { useSearchParamsQuery } from '@/hooks/useSearchParams';
import { useTable } from '@/hooks/useTable';
import type { IDataTableProps } from '@/types/table';
import { PlusCircleFilled } from '@ant-design/icons-vue';
import { Table, Tooltip } from 'ant-design-vue';
import { computed } from 'vue';
import ExportDataTable from './ExportDataTable.vue';
import TableResetAllFilter from './TableResetAllFilter.vue';
import TableFilterByDate from './TableFilterByDate.vue';
import TableSearch from './TableSearch.vue';

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
const { queryParams } = useSearchParamsQuery();
const { tablePaginationConfig } = useTable();
const pagination = computed(() =>
  tablePaginationConfig(
    totalData,
    queryParams.page,
    queryParams.limit
  )
);
</script>

<template>
  <div>
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
        <TableResetAllFilter />
        <TableFilterByDate :tableName="tableName" />
        <TableSearch />
      </div>
    </div>
    <Table
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
