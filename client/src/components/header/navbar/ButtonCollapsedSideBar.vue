<script setup lang="ts">
import { Button } from '@/components/elements';
import type { IButtonCollapsedSideBarProps } from '@/types';
import {
  LeftCircleFilled,
  RightCircleFilled
} from '@ant-design/icons-vue';
import { h } from 'vue';

const { collapsed } = defineProps<IButtonCollapsedSideBarProps>();
const emit = defineEmits(['toggle']);
const toggleCollapsed = () => {
  emit('toggle');
};
</script>

<template>
  <Button
    :icon="
      h(collapsed ? RightCircleFilled : LeftCircleFilled, {
        class:
          'text-2xl text-gray-500 hover:text-blue-400 duration-300'
      })
    "
    class="border-none !bg-inherit absolute -right-3 top-0 z-50 p-0"
    @click="toggleCollapsed"
  />
</template>

<style scoped></style>
