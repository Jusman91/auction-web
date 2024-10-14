import type {
  FormProps,
  InputProps,
  ModalProps
} from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { FieldName } from './store';
import type { Dayjs } from 'dayjs';
export * from './store';
export * from './storage';
export * from './api';
export interface IBaseLabelProps {
  htmlFor?: string;
}
export interface IAuthFormProps extends FormProps {
  loading?: boolean;
}
export type AuthFormName =
  | 'register'
  | 'login'
  | 'forgot-password'
  | 'reset-password';

export interface IRegisterFields extends ILoginFields {
  name: string;
  address: string;
  phone: string;
  confirmPassword: string;
  termsAndConditions: boolean;
}
export interface ILoginFields extends IForgotPasswordFields {
  password: string;
}
export interface IForgotPasswordFields {
  email: string;
}
export interface IResetPasswordFields {
  password: string;
  confirmPassword: string;
}
export type FormName = AuthFormName;
export interface IAuthFromDynamicInputProps extends InputProps {
  modelValue: string | boolean | undefined;
}
export interface ISwitchAuthData {
  path: string;
  desc: string;
  txtLink: string;
}

export interface IRulesAuth {
  name: Rule[];
  email: Rule[];
  address: Rule[];
  phone: Rule[];
  password: Rule[];
  confirmPassword: Rule[];
  termsAndConditions: Rule[];
}

export interface IsAuthFormFieldHidden {
  fieldName: keyof FieldName;
  formName: AuthFormName;
}

export interface IAuthModalProps extends ModalProps {
  message: string;
  isSuccess: boolean;
}

export interface IButtonCollapsedSideBarProps {
  collapsed: boolean;
}

export type Dates = [Dayjs, Dayjs] | [string, string] | undefined;
export type Date = Dayjs | string | undefined;
