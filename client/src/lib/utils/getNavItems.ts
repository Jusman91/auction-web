import type { ItemType } from 'ant-design-vue';
import { reactive, type VueElement } from 'vue';

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

export const navItems: ItemType[] = reactive([
  getItem('Home', '/'),
  getItem('Items', '/items'),
  getItem('Blog', '/blog'),
  getItem('About', '/about'),
  getItem('Services', '/services'),
  getItem('Contact', '/contact')
]);
