<script setup lang="ts">
import type { IAuthFromDynamicInputProps } from '@/types';
import { Input, Checkbox } from 'ant-design-vue';
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
import type { CheckboxChangeEvent } from 'ant-design-vue/es/checkbox/interface';
import { computed } from 'vue';

const { name, modelValue, ...props } =
  defineProps<IAuthFromDynamicInputProps>();
const emit = defineEmits(['update:modelValue']);

const isTextField = computed(() =>
  ['name', 'email', 'address', 'phone'].includes(name!)
);
const isPasswordField = computed(() =>
  ['password', 'confirmPassword'].includes(name!)
);
const isCheckboxField = computed(() => name === 'termsAndConditions');

const handleUpdate = (e: ChangeEvent) => {
  emit('update:modelValue', e.target.value);
};
const handleCheckboxChange = (checked: CheckboxChangeEvent) => {
  emit('update:modelValue', checked.target.checked);
};
</script>

<template>
  <div>
    <Input
      :id="name"
      v-if="isTextField"
      :v-model:value="modelValue"
      @input="handleUpdate"
      size="large"
      class="mb-0"
      :placeholder="props.placeholder"
      autocomplete="off"
    />
    <Input.Password
      :id="name"
      v-if="isPasswordField"
      :v-model:value="modelValue"
      @input="handleUpdate"
      size="large"
      class="mb-0"
      :placeholder="props.placeholder"
      autocomplete="off"
    />
    <Checkbox
      v-if="isCheckboxField"
      :id="name"
      :checked="modelValue as boolean"
      @change="handleCheckboxChange"
    >
      Terms and Conditions
    </Checkbox>
  </div>
</template>
