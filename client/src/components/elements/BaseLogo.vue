<script setup lang="ts">
import { LOGO } from '@/assets/img';
import { useWindowScroll } from '@vueuse/core';
import { computed } from 'vue';

const { y } = useWindowScroll();
const scrollClass = computed(() =>
  y.value > 0 ? 'text-black' : 'text-white'
);
</script>

<template>
  <div className="flex items-center gap-2">
    <img :src="LOGO" alt="Logo" className="w-10 h-10" />
    <h4 :class="[scrollClass, '_ text-2xl font-semibold']">Bid2X</h4>
  </div>
</template>
