import { Label } from '@/components/elements';
import type { AuthFormName } from '@/types';
import type { FormItemProps } from 'ant-design-vue';
import { h } from 'vue';
import { getAuthFormValidations } from './getAuthFormValidation';

export function getAuthFormFields(formName: AuthFormName) {
  const validations = getAuthFormValidations(formName);
  const fieldItems: FormItemProps[] = [
    {
      name: 'name',
      htmlFor: 'name',
      label: h(Label, { htmlFor: 'name' }, () => 'Name'),
      rules: validations.name,
      hasFeedback: true
    },
    {
      name: 'email',
      htmlFor: 'email',
      label: h(Label, { htmlFor: 'email' }, () => 'Email'),
      rules: validations.email,
      hasFeedback: true
    },
    {
      name: 'address',
      htmlFor: 'address',
      label: h(Label, { htmlFor: 'address' }, () => 'Address'),
      rules: validations.address,
      hasFeedback: true
    },
    {
      name: 'phone',
      htmlFor: 'phone',
      label: h(Label, { htmlFor: 'phone' }, () => 'Phone'),
      rules: validations.phone,
      hasFeedback: true
    },

    {
      name: 'password',
      htmlFor: 'password',
      label: h(Label, { htmlFor: 'password' }, () => 'Password'),
      rules: validations.password,
      hasFeedback: true
    },
    {
      name: 'confirmPassword',
      htmlFor: 'confirmPassword',
      label: h(
        Label,
        { htmlFor: 'confirmPassword' },
        () => 'Confirm Password'
      ),
      rules: validations.confirmPassword,
      hasFeedback: true
    },
    {
      name: 'termsAndConditions',
      htmlFor: 'termsAndConditions',
      rules: validations.termsAndConditions
    }
  ];

  return { fieldItems };
}
