<script setup lang="ts">
import { Tooltip } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { Button } from '../elements';

const router = useRouter();

const onReset = () => {
  router.push({ query: {} }); // Reset semua query di URL
};
</script>

<template>
  <Tooltip title="Reset all filter">
    <Button
      type="primary"
      size="small"
      @click="onReset"
      class="text-sm"
      >Reset</Button
    >
  </Tooltip>
</template>
