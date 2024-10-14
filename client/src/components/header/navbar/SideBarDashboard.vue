<script setup lang="ts">
import {
  getSelectedKeysDashboard,
  saveSelectedKeysDashboard
} from '@/lib/utils';
import { menuDashboardItems } from '@/lib/utils/getMenuDashboardItems';
import { Menu, type MenuProps } from 'ant-design-vue';
import { onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedKeys = ref<string[]>(getSelectedKeysDashboard());
const handleClick: MenuProps['onClick'] = (e) => {
  e.domEvent.preventDefault();
  router.push(`/dashboard/${e.key}`);
  saveSelectedKeysDashboard(e.key as string);
};

onUnmounted(() => {
  saveSelectedKeysDashboard('dashboard');
});
</script>

<template>
  <Menu
    id="side-bar-dashboard"
    class="custom-menu-dashboard !bg-inherit font-medium py-8 md:py-0 border-b-0 sticky top-0 h-[60vh] overflow-y-scroll overflow-x-hidden"
    mode="inline"
    v-model:selected-keys="selectedKeys"
    :active-key="selectedKeys[0]"
    :items="menuDashboardItems"
    @click="handleClick"
  >
  </Menu>
</template>

<style>
.custom-menu-dashboard .ant-menu-item {
  display: flex;
  gap: 0.5rem;
}
</style>
