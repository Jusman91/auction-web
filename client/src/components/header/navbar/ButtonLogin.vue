<script setup lang="ts">
import { Button } from '@/components/elements';
import type { RootState } from '@/types';
import { useWindowScroll } from '@vueuse/core';
import { computed } from 'vue';
import { useStore } from 'vuex';

const { y } = useWindowScroll();
const btnBg = computed(() =>
  y.value > 0 ? 'bg-primary-30/70 text-white' : ''
);
const store = useStore<RootState>();
const user = computed(() => store.state.user.user);
</script>
<template>
  <RouterLink v-if="!user" to="/auth/login">
    <Button
      size="small"
      shape="round"
      :class="[
        btnBg,
        '_ hover:bg-primary-30 duration-150 hover:!text-white'
      ]"
    >
      Login
    </Button>
  </RouterLink>
</template>
