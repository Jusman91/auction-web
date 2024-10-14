<script setup lang="ts">
import { PROFILEPIC } from '@/assets/img';
import type { RootState } from '@/types';
import { Tooltip } from 'ant-design-vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore<RootState>();
const user = computed(() => store.state.user.user);
</script>

<template>
  <Tooltip title="Dashboard">
    <RouterLink v-if="user" to="/dashboard" class="cursor-pointer">
      <img
        :src="user?.profilePic ? user?.profilePic : PROFILEPIC"
        alt="Profile Picture"
        loading="lazy"
        class="w-8 h-8 object-cover"
      />
    </RouterLink>
  </Tooltip>
</template>

<style scoped></style>
