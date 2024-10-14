<script setup lang="ts">
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from 'ant-design-vue';
import type { ClassValue } from 'clsx';
const props = defineProps<ButtonProps>();
</script>

<template>
  <Button
    v-bind="props"
    :class="
      cn('flex justify-center items-center text-lg font-semibold', $attrs.class as ClassValue)
    "
  >
    <slot></slot>
  </Button>
</template>
