import type { AuthFormName, ISwitchAuthData } from '@/types';

export function getAuthFormSwitch(
  formName: AuthFormName
): ISwitchAuthData {
  const formSwitchData: Record<AuthFormName, ISwitchAuthData> = {
    register: {
      path: `/auth/login`,
      desc: 'Already have an account?',
      txtLink: 'login'
    },
    login: {
      path: `/auth/register`,
      desc: "Don't have an account?",
      txtLink: 'register'
    },
    'forgot-password': {
      path: `/auth/login`,
      desc: '\u{21b5}Back to',
      txtLink: 'login'
    },
    'reset-password': {
      path: `/auth/login`,
      desc: '\u{21b5}Back to',
      txtLink: 'login'
    }
  };

  return formSwitchData[formName];
}
