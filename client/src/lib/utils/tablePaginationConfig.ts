import { useSearchParamsQuery } from '@/hooks/useSearchParams';
import type { TablePaginationConfig } from 'ant-design-vue';
import { computed } from 'vue';

export const tablePaginationConfig = (
  totalData: number,
  currentPage: number | undefined,
  pageSize: number | undefined
) => {
  const config: TablePaginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: totalData,
    showQuickJumper: true,
    showSizeChanger: true
  };

  return config;
};
