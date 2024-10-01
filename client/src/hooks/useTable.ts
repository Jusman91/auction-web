import type { TableHandleType } from '@/types/table';
import type { TablePaginationConfig } from 'ant-design-vue';
import type { FilterValue } from 'ant-design-vue/es/table/interface';

import { useRoute, useRouter } from 'vue-router';
export const useTable = () => {
  const router = useRouter();
  const route = useRoute();

  const tablePaginationConfig = (
    totalData: number | undefined,
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
  const handleTableChange = <T>({
    pagination,
    filters,
    sorter
  }: TableHandleType<T>) => {
    console.log('Filters:', filters);
    const currentPage = pagination.current || 1; // Fallback to 1 if current page is not set
    const pageSize = pagination.pageSize || 10;

    const sortFields = Array.isArray(sorter)
      ? sorter.map((s) => s.field)
      : [sorter.field];

    const sortOrders = Array.isArray(sorter)
      ? sorter.map((s) => (s.order === 'ascend' ? 'asc' : 'desc'))
      : [sorter.order === 'ascend' ? 'asc' : 'desc'];

    // Tangani filter kategori
    let filtersCategory: string | FilterValue = '';
    if (
      filters &&
      filters.category &&
      Array.isArray(filters.category)
    ) {
      // Jika ada beberapa pilihan kategori, gabungkan mereka menjadi satu string
      filtersCategory = filters.category.join(',');
    } else if (filters?.category) {
      filtersCategory = filters.category as unknown as string;
    }

    console.log('filtersCategory', filtersCategory);
    // Update URL query for both page and limit
    // router.push({
    //   query: {
    //     ...route.query,
    //     page: currentPage.toString(), // Convert to string for URL
    //     limit: pageSize.toString(),
    //     sort: (sortFields as string[]) || '', // Masukkan field sorting
    //     order: sortOrders || '', // Masukkan urutan sorting (asc/desc)
    //     category: (filtersCategory as string) || ''
    //   }
    // });

    const updatedQuery: { [key: string]: string | string[] } = {
      ...route.query,
      page: currentPage.toString(),
      limit: pageSize.toString()
      // sort: (sortFields as string[]) || '',
      // order: sortOrders || ''
    };

    // Hanya tambahkan `sort` jika ada nilai
    if (sortFields.length > 0 && sortFields[0]) {
      updatedQuery.sort = sortFields as string[];
    } else {
      delete updatedQuery.sort; // Hapus `sort` jika tidak ada nilai sorting
    }

    // Hanya tambahkan `order` jika ada nilai
    if (sortOrders.length > 0 && sortOrders[0]) {
      updatedQuery.order = sortOrders as string[];
    } else {
      delete updatedQuery.order; // Hapus `order` jika tidak ada urutan
    }

    // Hanya tambahkan `category` jika ada nilai
    if (filtersCategory) {
      updatedQuery.category = filtersCategory as string;
    } else {
      delete updatedQuery.category; // Hapus `category` jika tidak ada filter yang dipilih
    }

    // Push perubahan ke router
    router.push({
      query: updatedQuery
    });
  };

  return { tablePaginationConfig, handleTableChange };
};
