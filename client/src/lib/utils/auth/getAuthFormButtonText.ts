import type { AuthFormName } from '@/types';

export function getAuthFormButtonText(
  formName: AuthFormName
): string {
  const buttonText: Record<AuthFormName, string> = {
    register: 'Register',
    login: 'Login',
    'forgot-password': 'Send',
    'reset-password': 'Reset'
  };

  return buttonText[formName];
}
