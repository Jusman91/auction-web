<script setup lang="ts">
import HeroHome from '@/components/hero/HeroHome.vue';
import type { RootState } from '@/types';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore<RootState>();
const user = computed(() => store.state.user.user);
</script>

<template>
  <section>
    <HeroHome />
    <div class="w-full h-screen"></div>
  </section>
</template>
