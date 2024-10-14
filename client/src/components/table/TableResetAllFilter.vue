<script setup lang="ts">
import { Tooltip } from 'ant-design-vue';
import { Button } from '../elements';

const emit = defineEmits(['reset-filters']);

const onReset = () => {
  emit('reset-filters')
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
