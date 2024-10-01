<script setup lang="ts">
import {
  DownloadOutlined,
  FileExcelTwoTone,
  FilePdfTwoTone,
  FileTwoTone
} from '@ant-design/icons-vue';
import { Tooltip } from 'ant-design-vue';
import { ref } from 'vue';
import {
  exportToCSV,
  exportToExcel,
  exportToPDF
} from '@/lib/utils/exportData';
import type { ExportDataTable } from '@/types/table';
interface IExportDataTableProps extends ExportDataTable {}
const { data, columnsToExport, fileName } =
  defineProps<IExportDataTableProps>();

const toggleDownloadFile = ref(false);

const handleExel = () => {
  exportToExcel({ data, columnsToExport, fileName });
};
const handleCSV = () => {
  exportToCSV({ data, columnsToExport, fileName });
};
const handlePDF = () => {
  exportToPDF({ data, columnsToExport, fileName });
};
</script>

<template>
  <div class="relative">
    <Tooltip title="Download file">
      <DownloadOutlined
        class="text-xl text-blue-500 hover:text-blue-400 duration-150 cursor-pointer leading-[0]"
        @click="toggleDownloadFile = !toggleDownloadFile"
      />
    </Tooltip>
  </div>
  <div
    :class="
      toggleDownloadFile ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
    "
    class="absolute left-8 top-8 z-10 w-fit grid transition-[grid-template-rows] duration-150 px-3 bg-slate-200 rounded-lg"
  >
    <div class="flex flex-col gap-2 overflow-hidden">
      <Tooltip title="Export to PDF">
        <FilePdfTwoTone
          @click="handlePDF"
          class="text-xl cursor-pointer leading-[0] pt-2"
        />
      </Tooltip>
      <Tooltip title="Export to CSV">
        <FileTwoTone
          @click="handleCSV"
          class="text-xl cursor-pointer leading-[0]"
        />
      </Tooltip>
      <Tooltip title="Export to Exel">
        <FileExcelTwoTone
          @click="handleExel"
          class="text-xl cursor-pointer leading-[0] pb-2"
        />
      </Tooltip>
    </div>
  </div>
</template>
