import type {
  ColumnsType,
  TablePaginationConfig
} from 'ant-design-vue/es/table';
import type { IItem, IUser } from './api';
import type {
  FilterValue,
  SorterResult
} from 'ant-design-vue/es/table/interface';

export type TableName = 'table-item' | 'table-user';
export type DataTableType = IUser | IItem;
export interface IDataTableProps {
  tableName?: TableName;
  data: DataTableType[] | undefined;
  columns: ColumnsType<DataTableType>;
  totalData: number | undefined;
  loading: boolean;
  columnsToExport: string[];
  fileName: string;
  // addData: string;
  // onChange: (
  //   pagination: TablePaginationConfig,
  //   filters: Record<string, FilterValue | null>,
  //   sorter: SorterResult<T> | SorterResult<T>[]
  // ) => void;
}

export type TableHandleType<T> = {
  pagination: TablePaginationConfig;
  filters?: Record<string, FilterValue | null>;
  sorter: SorterResult<T> | SorterResult<T>[];
};

export type ExportDataTable = {
  data: DataTableType[] | undefined;
  columnsToExport: string[];
  fileName: string;
};
