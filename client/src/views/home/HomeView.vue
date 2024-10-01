<script setup lang="ts">
import type { RootState } from '@/types';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore<RootState>();
const user = computed(() => store.state.user.user);
</script>

<template>
  <main>
    <h1>{{ user?.name }}</h1>
    <h1>{{ user?.role }}</h1>
  </main>
</template>
