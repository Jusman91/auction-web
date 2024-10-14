<script setup lang="ts">
import { cn, getAuthFormSwitch } from '@/lib/utils';
import type { RootState } from '@/types';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore<RootState>();
const name = computed(() => store.state.form.name);
const { desc, path, txtLink } = getAuthFormSwitch(name.value);
</script>

<template>
  <div
    :class="
      cn('flex items-center', {
        'justify-between': name === 'login',
        'justify-center': name !== 'login'
      })
    "
  >
    <div class="flex items-center gap-1">
      <p>{{ desc }}</p>
      <RouterLink :to="path" class="text-blue-500 capitalize">
        {{ txtLink }}
      </RouterLink>
    </div>
    <RouterLink
      v-if="name === 'login'"
      to="/auth/forgot-password"
      class="text-blue-500 capitalize"
    >
      Forgot Password?
    </RouterLink>
  </div>
</template>
