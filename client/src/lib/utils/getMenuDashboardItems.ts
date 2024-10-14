import { store } from '@/store';
import {
  ApartmentOutlined,
  AppstoreFilled,
  AppstoreOutlined,
  DollarCircleFilled,
  GoldFilled,
  HeartFilled,
  IdcardOutlined,
  LogoutOutlined,
  MoneyCollectFilled,
  PlusCircleFilled,
  UserOutlined
} from '@ant-design/icons-vue';
import type { ItemType } from 'ant-design-vue';
import { type VueElement, computed, h } from 'vue';

// Function to create a menu item
function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group'
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type
  } as ItemType;
}

const userRole = computed(() => store.state.user.user);
const role = userRole.value?.role;

// Define all menu items
const allMenuItems: ItemType[] = [
  getItem('Dashboard', '', () => h(AppstoreFilled)),
  getItem('My Items', 'my-items', () => h(GoldFilled)),
  getItem('Create Item', 'create-item', () => h(PlusCircleFilled)),
  getItem('All User', 'users', () => h(UserOutlined)),
  getItem('All Items', 'items', () => h(MoneyCollectFilled)),
  getItem('Categories', 'categories', () => h(ApartmentOutlined)),
  getItem('Income', 'income', () => h(DollarCircleFilled)),
  getItem('Winning Bids', 'winning-bids', () => h(AppstoreOutlined)),
  getItem('My Favorites', 'favorites', () => h(HeartFilled)),
  getItem('Personal Profile', 'profile', () => h(IdcardOutlined)),
  getItem('Logout', '/logout', () => h(LogoutOutlined))
];

// Dynamically hide items based on user role
export const menuDashboardItems = computed(() => {
  return allMenuItems.filter((item) => {
    if (role === 'Admin') {
      return true;
    }

    if (role === 'Bidder') {
      return !(
        item?.key === '/my-items' ||
        item?.key === '/create-item' ||
        item?.key === '/users' ||
        item?.key === '/items' ||
        item?.key === '/categories' ||
        item?.key === '/income'
      );
    }
    if (role === 'Auctioneer') {
      return !(
        item?.key === '/users' ||
        item?.key === '/items' ||
        item?.key === '/categories' ||
        item?.key === '/income'
      );
    }
    return true;
  });
});
