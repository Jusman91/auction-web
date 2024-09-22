<script setup lang="ts">
import AuthForm from '@/components/form/auth/AuthForm.vue';
import AuthModal from '@/components/modal/auth/AuthModal.vue';
import { useLogin } from '@/hooks';
import { useDispatch } from '@/store/helpers';
import { useCommit } from '@/store/helpers/useCommit';
import {
  type RootState,
  type MutationsForm,
  MutationFormTypes,
  type ActionsForm,
  ActionFormTypes,
  type ILoginFields
} from '@/types';
import { computed, onBeforeMount, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore<RootState>();
const router = useRouter();
const modelValue = computed(() => store.state.form.model);
const { handleLogin, data, error, isSuccess } = useLogin();
const { commit } = useCommit<MutationsForm>({
  store,
  namespace: 'form'
});
const { dispatch } = useDispatch<ActionsForm>({
  store,
  namespace: 'form'
});
const model: ILoginFields = reactive({
  email: '',
  password: ''
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
    payload: 'login'
  });
});
const handleSubmit = (values: ILoginFields) => {
  handleLogin({ formFields: values });
};

const handleAfterClose = () => {
  if (isSuccess.value) {
    router.push('/');
  }
};

watch(
  [() => modelValue.value.password, () => modelValue.value.email],
  () => {
    if (modelValue.value.password && modelValue.value.email) {
      dispatch({
        type: ActionFormTypes.ENABLED_BUTTON
      });
    }
  }
);
</script>

<template>
  <section>
    <AuthForm name="login" @finish="handleSubmit" />
    <AuthModal
      :message="message"
      :isSuccess="isSuccess"
      :afterClose="handleAfterClose"
    />
  </section>
</template>
