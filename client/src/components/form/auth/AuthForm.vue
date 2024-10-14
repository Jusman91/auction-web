<script setup lang="ts">
import {
  MutationFormTypes,
  type MutationsForm,
  type FormModel,
  type RootState
} from '@/types';
import {
  Form,
  type FormInstance,
  type FormProps
} from 'ant-design-vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import AuthFormFields from './AuthFormFields.vue';
import AuthFormButton from './AuthFormButton.vue';
import { useStore } from 'vuex';
import AuthFormSwitch from './AuthFormSwitch.vue';
import { useCommit } from '@/store/helpers';

const { name } = defineProps<FormProps>();
const store = useStore<RootState>();
const { commit } = useCommit<MutationsForm>({
  store,
  namespace: 'form'
});

const model = computed(() => store.state.form.model);
const emit = defineEmits(['finish']);

const formRef = ref<FormInstance | null>(null);
function emitFinish(values: FormModel) {
  emit('finish', values);
}

onMounted(() => {
  commit({
    type: MutationFormTypes.SET_FORM_REF,
    payload: formRef.value
  });
});
onBeforeUnmount(() => {
  commit({ type: MutationFormTypes.RESET_FIELDS });
});
</script>

<template>
  <Form
    ref="formRef"
    class="w-96 flex flex-col gap-4"
    :model="model"
    layout="vertical"
    :name="name"
    autocomplete="off"
    @finish="emitFinish"
  >
    <AuthFormFields />
    <AuthFormSwitch />
    <AuthFormButton />
  </Form>
</template>
