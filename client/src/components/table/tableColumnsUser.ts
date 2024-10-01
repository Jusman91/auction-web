import type { IUser } from '@/types';
import { Avatar } from 'ant-design-vue';
import type { ColumnsType } from 'ant-design-vue/es/table';
import { h } from 'vue';

export const TableColumnsUser = () => {
  const columnsUser: ColumnsType<IUser> = [
    {
      title: 'Pic',
      dataIndex: 'profilePic',
      key: 'profilePic',
      width: '8%',
      align: 'center',

      customRender: ({ value }) => {
        return h(Avatar, { src: value });
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      // ellipsis: true,
      customRender: ({ value }) => {
        return h('span', { class: 'capitalize' }, value);
      },
      sorter: {
        multiple: 5
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      // ellipsis: true,
      class: 'capitalize',
      sorter: {
        multiple: 4
      }
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      // ellipsis: true,
      class: 'capitalize',
      sorter: {
        multiple: 3
      }
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      // ellipsis: true,
      class: 'capitalize',
      sorter: {
        multiple: 2
      }
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      // ellipsis: true,
      class: 'capitalize',
      sorter: {
        multiple: 1
      }
    }
  ];

  return columnsUser;
};
