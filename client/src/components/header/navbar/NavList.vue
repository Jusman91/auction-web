<script setup lang="ts">
import { navItems } from '@/lib/utils/getNavItems';
import { Menu, type MenuProps } from 'ant-design-vue';
import { ref } from 'vue';

const selectedKeys = ref<string[]>(['/']);

const handleClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};
</script>

<template>
  <Menu
    id="navlist"
    class="costum-nav-list !bg-inherit font-medium py-8 md:py-0 h-full border-b-0"
    mode="horizontal"
    v-model:selected-keys="selectedKeys"
    :items="navItems"
    @click="handleClick"
  >
  </Menu>
</template>

<style>
.costum-nav-list.ant-menu-light.ant-menu-horizontal
  > .ant-menu-item::after {
  bottom: -10px;
}
</style>
