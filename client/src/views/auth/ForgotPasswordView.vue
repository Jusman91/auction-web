<script setup lang="ts">
import AuthForm from '@/components/form/auth/AuthForm.vue';
import { useDispatch } from '@/store/helpers';
import { useCommit } from '@/store/helpers/useCommit';
import {
  type RootState,
  type MutationsForm,
  MutationFormTypes,
  type ActionsForm,
  ActionFormTypes,
  type IForgotPasswordFields
} from '@/types';
import { computed, onBeforeMount, reactive, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore<RootState>();
const formRef = computed(() => store.state.form.formRef);
const modelValue = computed(() => store.state.form.model);

const { commit } = useCommit<MutationsForm>({
  store,
  namespace: 'form'
});
const { dispatch } = useDispatch<ActionsForm>({
  store,
  namespace: 'form'
});
const model: IForgotPasswordFields = reactive({
  email: ''
});

onBeforeMount(() => {
  commit({
    type: MutationFormTypes.SET_MODEL,
    payload: model
  });
  commit({
    type: MutationFormTypes.SET_NAME,
    payload: 'forgot-password'
  });
});
const handleSubmit = (values: IForgotPasswordFields) => {
  console.log(values);
};

watch(
  () => modelValue.value.email,
  () => {
    if (formRef.value) {
      dispatch({
        type: ActionFormTypes.ENABLED_BUTTON
      });
    }
  }
);
</script>

<template>
  <section>
    <h1 class="text-3xl text-center font-semibold">
      Forgot Password
    </h1>
    <AuthForm name="forgot-password" @finish="handleSubmit" />
  </section>
</template>
