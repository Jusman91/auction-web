<script setup lang="ts">
import { FAILURE, SUCCESS } from '@/assets/img';
import {
  MutationModalTypes,
  type IAuthModalProps,
  type MutationsModal,
  type RootState
} from '@/types';
import { Modal } from 'ant-design-vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { onClickOutside } from '@vueuse/core';
import { useCommit } from '@/store/helpers';

const { message, isSuccess, afterClose } =
  defineProps<IAuthModalProps>();
const store = useStore<RootState>();
const modalRef = ref(null);

const open = computed(() => store.state.modal.isOpenModals.auth);
const icon = computed(() => (isSuccess ? SUCCESS : FAILURE));
const alt = computed(() => (isSuccess ? 'success' : 'failure'));
const title = computed(() => store.state.form.name);

const { commit } = useCommit<MutationsModal>({
  store,
  namespace: 'modal'
});

onClickOutside(modalRef, () => {
  commit({
    type: MutationModalTypes.CLOSE_MODAL,
    payload: 'auth'
  });
});
</script>

<template>
  <Modal
    ref="modalRef"
    :open="open"
    :closabled="true"
    centered
    :footer="null"
    :close-icon="null"
    :after-close="afterClose"
    class="w-full max-w-[500px]"
  >
    <div
      class="flex flex-col justify-center items-center gap-6 py-11 px-6 rounded-2xl"
    >
      <img :src="icon" :alt="alt" loading="lazy" />
      <div class="first-letter:capitalize text-center">
        <h1 class="text-3xl">{{ title }}</h1>
        <h2 class="text-sm font-medium text-gray-500">
          {{ message }}
        </h2>
      </div>
    </div>
  </Modal>
</template>
