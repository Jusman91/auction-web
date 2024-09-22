import type { IsAuthFormFieldHidden } from '@/types';

export function isAuthFormFieldHidden({
  fieldName,
  formName
}: IsAuthFormFieldHidden): boolean {
  switch (formName) {
    // return true if the field name includes a hidden field
    case 'login':
      return [
        'name',
        'address',
        'phone',
        'confirmPassword',
        'termsAndConditions'
      ].includes(fieldName);
    case 'forgot-password':
      return [
        'name',
        'address',
        'phone',
        'password',
        'confirmPassword',
        'termsAndConditions'
      ].includes(fieldName);
    case 'reset-password':
      return [
        'name',
        'email',
        'address',
        'phone',
        'termsAndConditions'
      ].includes(fieldName);
    default:
      return false;
  }
}
