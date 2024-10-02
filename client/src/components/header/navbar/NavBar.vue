<script setup lang="ts">
import { Button, Logo } from '@/components/elements';
import NavList from './NavList.vue';
import {
  CloseCircleOutlined,
  MenuUnfoldOutlined,
  SearchOutlined
} from '@ant-design/icons-vue';
import ProfilePic from '../ProfilePic.vue';
import ButtonLogin from './ButtonLogin.vue';
import {
  breakpointsTailwind,
  useBreakpoints,
  useWindowScroll
} from '@vueuse/core';
import { computed, ref } from 'vue';

const toggleMenu = ref<boolean>(false);
const { y } = useWindowScroll();
const navBgClass = computed(() =>
  y.value > 0 && isHorizontal.value
    ? 'bg-white scrolled'
    : 'bg-primary-20/70'
);
const breakpoints = useBreakpoints(breakpointsTailwind);
const largerThanMd = breakpoints.greater('md');
const isHorizontal = computed(() => largerThanMd.value);
</script>

<template>
  <nav
    :class="[
      navBgClass,
      'sticky top-0 h-16 flex items-center justify-between px-6 lg:px-12 z-[999]'
    ]"
  >
    <Logo />
    <div
      :class="[
        'w-full md:w-fit h-screen md:h-fit flex items-center flex-col md:flex-row absolute md:relative left-0 top-0 z-50 md:translate-x-[0%] duration-700',
        toggleMenu ? 'translate-x-[0%]' : '-translate-x-full'
      ]"
    >
      <NavList />
    </div>
    <div class="flex items-center gap-2">
      <SearchOutlined />
      <ButtonLogin />
      <ProfilePic />
    </div>
    <Button
      size="middle"
      shape="circle"
      class="md:hidden z-[999]"
      @click="toggleMenu = !toggleMenu"
    >
      <MenuUnfoldOutlined v-if="!toggleMenu" class="leading-[0]" />
      <CloseCircleOutlined v-else class="text-xl leading-[0]" />
    </Button>
  </nav>
</template>

<style scoped>
nav {
  transition: background-color 0.3s ease;
}
.scrolled {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeInDown 0.5s ease;
  z-index: 100;
}
@keyframes fadeInDown {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
