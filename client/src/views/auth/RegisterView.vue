<script setup lang="ts">
import AuthForm from '@/components/form/auth/AuthForm.vue';
import AuthModal from '@/components/modal/auth/AuthModal.vue';
import { useRegister } from '@/hooks';
import { useDispatch } from '@/store/helpers';
import { useCommit } from '@/store/helpers/useCommit';
import {
  type RootState,
  type MutationsForm,
  MutationFormTypes,
  ActionFormTypes,
  type ActionsForm,
  type IRegisterFields
} from '@/types';
import { computed, onBeforeMount, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore<RootState>();
const router = useRouter();
const formRef = computed(() => store.state.form.formRef);
const modelValue = computed(() => store.state.form.model);
const { handleRegister, data, error, isSuccess } = useRegister();

const { commit } = useCommit<MutationsForm>({
  store,
  namespace: 'form'
});
const { dispatch } = useDispatch<ActionsForm>({
  store,
  namespace: 'form'
});
const model: IRegisterFields = reactive({
  name: '',
  email: '',
  address: '',
  phone: '',
  password: '',
  confirmPassword: '',
  termsAndConditions: false
});

const message = computed(() => {
  return (
    data.value?.message ||
    error.value?.message ||
    'No message available'
  );
});

onBeforeMount(() => {
  commit({
    type: MutationFormTypes.SET_MODEL,
    payload: model
  });
  commit({
    type: MutationFormTypes.SET_NAME,
    payload: 'register'
  });
});
const handleSubmit = (values: IRegisterFields) => {
  handleRegister({ formFields: values });
};

const handleAfterClose = () => {
  if (isSuccess.value) {
    router.push('/auth/login');
  }
};

watch(
  [
    () => modelValue.value.name,
    () => modelValue.value.email,
    () => modelValue.value.address,
    () => modelValue.value.phone,
    () => modelValue.value.password,
    () => modelValue.value.confirmPassword,
    () => modelValue.value.termsAndConditions
  ],
  () => {
    if (formRef.value && modelValue.value.confirmPassword) {
      formRef.value.validateFields(['confirmPassword']);
    }
    if (
      modelValue.value.name &&
      modelValue.value.email &&
      modelValue.value.address &&
      modelValue.value.phone &&
      modelValue.value.password &&
      modelValue.value.confirmPassword &&
      modelValue.value.termsAndConditions
    ) {
      dispatch({
        type: ActionFormTypes.ENABLED_BUTTON
      });
    }
  }
);
</script>

<template>
  <section>
    <h1 class="text-3xl text-center font-semibold">Register</h1>
    <AuthForm name="register" @finish="handleSubmit" />
    <AuthModal
      :message="message"
      :isSuccess="isSuccess"
      :afterClose="handleAfterClose"
    />
  </section>
</template>
