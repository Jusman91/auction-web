<script setup lang="ts">
import { Button } from '@/components/elements';
import { useGlobalLoading } from '@/hooks';
import { getAuthFormButtonText } from '@/lib/utils';
import { useCommit } from '@/store/helpers';
import {
  MutationFormTypes,
  type MutationsForm,
  type RootState
} from '@/types';
import { Spin } from 'ant-design-vue';
import { computed, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
const store = useStore<RootState>();
const name = computed(() => store.state.form.name);
const isDisabled = computed(() => {
  return store.state.form.disabled;
});
const buttonText = getAuthFormButtonText(name.value);
const { isLoading } = useGlobalLoading();

const { commit } = useCommit<MutationsForm>({
  store,
  namespace: 'form'
});

onBeforeUnmount(() => {
  commit({ type: MutationFormTypes.SET_DISABLED, payload: true });
});
</script>

<template>
  <Button
    :disabled="isDisabled"
    html-type="submit"
    type="primary"
    class="w-full h-16 mt-4 rounded-lg"
  >
    <Spin
      v-if="isLoading"
      tip="Loading..."
      class="custom-spin text-white"
    />
    <p v-else class="m-0">{{ buttonText }}</p>
  </Button>
</template>

<style>
.custom-spin .ant-spin-dot-item {
  background-color: white;
}
</style>
