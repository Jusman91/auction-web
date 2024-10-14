<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { IBaseLabelProps } from '@/types';
import type { ClassValue } from 'clsx';

const { htmlFor } = defineProps<IBaseLabelProps>();
</script>

<template>
  <label
    :for="htmlFor"
    :class="
      cn(
        'text-sm leading-5 font-semibold capitalize',
        $attrs.class as ClassValue
      )
    "
  >
    <slot></slot>
  </label>
</template>
