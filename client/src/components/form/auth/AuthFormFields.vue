<script setup lang="ts">
import {
  getAuthFormFields,
  isAuthFormFieldHidden
} from '@/lib/utils';
import { Form } from 'ant-design-vue';
import AuthFormDynamicInput from './AuthFormDynamicInput.vue';
import { computed } from 'vue';
import type { RootState, FieldName } from '@/types';
import { useStore } from 'vuex';
const { Item } = Form;
const store = useStore<RootState>();
const name = computed(() => store.state.form.name);
const model = computed(() => store.state.form.model || {});
const { fieldItems } = getAuthFormFields(name.value);
</script>

<template>
  <template v-for="field in fieldItems" :key="field.name">
    <Item
      v-if="
        !isAuthFormFieldHidden({
          fieldName: field.name as keyof FieldName,
          formName: name
        })
      "
      class="mb-0"
      :name="field.name"
      :label="field.label"
      :htmlFor="field.htmlFor"
      :rules="field.rules"
    >
      <AuthFormDynamicInput
        :name="field.name as string"
        v-model:modelValue="model[field.name as keyof FieldName]"
        :placeholder="`Type your ${field.name}`"
      />
    </Item>
  </template>
</template>
