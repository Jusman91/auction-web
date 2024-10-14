import type { ICategory, IItem } from '@/types';
import { Avatar } from 'ant-design-vue';
import type { ColumnsType } from 'ant-design-vue/es/table';
import dayjs from 'dayjs';
import { h, ref } from 'vue';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime'; // Import plugin duration
import type { ColumnFilterItem } from 'ant-design-vue/es/table/interface';
import { formatTimeCountdown } from '@/lib/utils/formatTimeCountdown';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const TableColumnItem = (categories: ICategory[]) => {
  const columnsItem: ColumnsType<IItem> = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '8%',
      align: 'center',

      customRender: ({ value }) => {
        return h(Avatar, { src: value });
      },
      customHeaderCell: () => ({
        style: {
          backgroundColor: '#60a5fa', // Set background color here
          color: '#fff', // Set text color
          fontWeight: 'bold' // Set font weight
        }
      })
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      // ellipsis: true,
      class: 'capitalize',
      sorter: {
        multiple: 8
      },
      customHeaderCell: () => ({
        style: {
          backgroundColor: '#60a5fa', // Set background color here
          color: '#fff', // Set text color
          fontWeight: 'bold' // Set font weight
        }
      })
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      // ellipsis: true,
      class: 'capitalize',
      sorter: {
        multiple: 7
      },
      customHeaderCell: () => ({
        style: {
          backgroundColor: '#60a5fa', // Set background color here
          color: '#fff', // Set text color
          fontWeight: 'bold' // Set font weight
        }
      })
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      // ellipsis: true,
      class: 'capitalize',
      sorter: {
        multiple: 6
      },
      // ...filterCategory
      filters: categories?.map(
        (category): ColumnFilterItem => ({
          text: category.name,
          value: category.name
        })
      ),
      customHeaderCell: () => ({
        style: {
          backgroundColor: '#60a5fa', // Set background color here
          color: '#fff', // Set text color
          fontWeight: 'bold' // Set font weight
        }
      })
    },
    {
      title: 'Starting Bid',
      dataIndex: 'startingBid',
      key: 'startingBid',
      align: 'center',
      // ellipsis: true,
      class: 'capitalize',
      sorter: {
        multiple: 5
      },
      customHeaderCell: () => ({
        style: {
          backgroundColor: '#60a5fa', // Set background color here
          color: '#fff', // Set text color
          fontWeight: 'bold' // Set font weight
        }
      })
    },
    {
      title: 'Current Bid',
      dataIndex: 'currentBid',
      key: 'currentBid',
      align: 'center',
      // ellipsis: true,
      class: 'capitalize',
      sorter: {
        multiple: 4
      },
      customHeaderCell: () => ({
        style: {
          backgroundColor: '#60a5fa', // Set background color here
          color: '#fff', // Set text color
          fontWeight: 'bold' // Set font weight
        }
      })
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      align: 'center',
      // ellipsis: true,
      class: 'capitalize',
      sorter: {
        multiple: 3
      },
      customHeaderCell: () => ({
        style: {
          backgroundColor: '#60a5fa', // Set background color here
          color: '#fff', // Set text color
          fontWeight: 'bold' // Set font weight
        }
      }),
      customRender: ({ record }) => {
        const startTime = dayjs(record.startTime).toDate();
        const endTime = dayjs(record.endTime).toDate();
        const timeUntilStart = ref(''); // Gunakan ref untuk menyimpan waktu tersisa

        const updateCountdown = () => {
          const { timeUntilStart: tUntilStart } = formatTimeCountdown(
            startTime,
            endTime
          );
          timeUntilStart.value = tUntilStart;
        };
        setInterval(updateCountdown, 1000); // Perbarui setiap detik
        updateCountdown();
        return h('span', timeUntilStart.value); // Tampilkan waktu tersisa
      }
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      align: 'center',
      // ellipsis: true,
      width: '15%',
      class: 'capitalize',
      sorter: {
        multiple: 2
      },
      customHeaderCell: () => ({
        style: {
          backgroundColor: '#60a5fa', // Set background color here
          color: '#fff', // Set text color
          fontWeight: 'bold' // Set font weight
        }
      }),
      customRender: ({ record }) => {
        const endTime = dayjs(record.endTime).toDate();
        const startTime = dayjs(record.startTime).toDate();
        const timeLeft = ref('');
        const updateCountdown = () => {
          const { timeLeft: tLeft } = formatTimeCountdown(
            startTime,
            endTime
          );
          timeLeft.value = tLeft;
        };
        setInterval(updateCountdown, 1000); // Perbarui setiap detik
        updateCountdown(); // Panggil fungsi untuk inisialisasi pertama kali

        // Kembalikan elemen dengan h
        return h('span', timeLeft.value); // Tampilkan waktu tersisa
      }
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      // ellipsis: true,
      class: 'capitalize',
      sorter: {
        multiple: 1
      },
      customHeaderCell: () => ({
        style: {
          backgroundColor: '#60a5fa', // Set background color here
          color: '#fff', // Set text color
          fontWeight: 'bold' // Set font weight
        }
      }),
      customRender: ({ record }) => {
        return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  ];
  return columnsItem;
};
