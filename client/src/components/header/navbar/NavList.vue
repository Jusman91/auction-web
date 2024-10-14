<script setup lang="ts">
import {
  getSelectedKeysNavbar,
  saveSelectedKeysNavbar
} from '@/lib/utils';
import { navItems } from '@/lib/utils/getNavItems';
import {
  breakpointsTailwind,
  useBreakpoints,
  useWindowScroll
} from '@vueuse/core';
import { ConfigProvider, Menu, type MenuProps } from 'ant-design-vue';
import { computed } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedKeys = ref<string[]>(getSelectedKeysNavbar());
const breakpoints = useBreakpoints(breakpointsTailwind);
const largerThanMd = breakpoints.greater('md');
const isHorizontal = computed(() => largerThanMd.value);

const handleClick: MenuProps['onClick'] = (e) => {
  e.domEvent.preventDefault();
  router.push(`${e.key}`);
  saveSelectedKeysNavbar(e.key as string);
};

const { y } = useWindowScroll();
const navBgClass = computed(() =>
  y.value > 0 ? 'text-black' : 'text-white'
);
const colorItemTextHover = computed(() =>
  y.value > 0 && isHorizontal.value ? '#53a5d5' : 'white'
);
</script>

<template>
  <ConfigProvider
    :theme="{
      components: {
        Menu: {
          colorItemTextHover: colorItemTextHover
        }
      }
    }"
  >
    <Menu
      id="navlist"
      :class="[
        navBgClass,
        'costum-nav-list w-full h-full bg-primary-30/80 md:!bg-inherit font-medium py-8 md:py-0 border-b-0'
      ]"
      :key="isHorizontal ? 'horizontal' : 'vertical'"
      :mode="isHorizontal ? 'horizontal' : 'vertical'"
      v-model:selected-keys="selectedKeys"
      :items="navItems"
      @click="handleClick"
    >
    </Menu>
  </ConfigProvider>
</template>

<style>
.costum-nav-list.ant-menu-light.ant-menu-horizontal
  > .ant-menu-item::after {
  bottom: -10px;
}
</style>
