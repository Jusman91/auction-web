import type { FormInstance } from 'ant-design-vue';
import type {
  FormName,
  IForgotPasswordFields,
  ILoginFields,
  IRegisterFields,
  IResetPasswordFields,
  IUser
} from '.';
import type { store } from '@/store';
import type { ActionContext } from 'vuex';
import type { NamePath } from 'ant-design-vue/es/form/interface';

export enum MutationFormTypes {
  SET_NAME = 'SET_NAME',
  SET_FORM_REF = 'SET_FORM_REF',
  SET_MODEL = 'SET_MODEL',
  SET_DISABLED = 'SET_DISABLED',
  RESET_FIELDS = 'RESET_FIELDS'
}
export enum MutationModalTypes {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL'
}
export enum ActionFormTypes {
  ENABLED_BUTTON = 'ENABLED_BUTTON'
}
// export type FieldName = AuthFieldName;
export type FormModel = IRegisterFields &
  ILoginFields &
  IForgotPasswordFields &
  IResetPasswordFields;
export type FieldName = FormModel;

// export type FormModel = AuthFormState;
export type Store = typeof store;

export interface FormState {
  formRef: FormInstance | null;
  name: FormName;
  disabled: boolean;
  // model: FieldName;
  model: Partial<Record<keyof FieldName, any>>;
}
export type RootState = {
  form: FormState;
  modal: ModalState;
  user: UserState;
};
export type NameSpace = 'form' | 'auth' | 'modal' | 'user';
export interface HelpersStore {
  store: Store;
  namespace: NameSpace;
}
export type MutationsForm = {
  [MutationFormTypes.SET_FORM_REF](
    state: FormState,
    payload: FormInstance | null
  ): void;
  [MutationFormTypes.SET_NAME](
    state: FormState,
    payload: FormName
  ): void;
  [MutationFormTypes.SET_MODEL](
    state: FormState,
    payload: Partial<FormModel>
  ): void;
  [MutationFormTypes.SET_DISABLED](
    state: FormState,
    payload: boolean
  ): boolean;
  [MutationFormTypes.RESET_FIELDS](state: FormState): void;
};
export type ActionsForm = {
  [ActionFormTypes.ENABLED_BUTTON](
    context: ActionContext<FormState, RootState>,
    payload?: string | NamePath[] | undefined
  ): Promise<void>;
};

// modal
export interface ModalState {
  isOpenModals: {
    [key in ModalType]: boolean;
  };
}
export type ModalType = 'auth' | 'user';
export type MutationsModal = {
  [MutationModalTypes.OPEN_MODAL](
    state: ModalState,
    type: ModalType
  ): void;
  [MutationModalTypes.CLOSE_MODAL](
    state: ModalState,
    type: ModalType
  ): void;
};

// user
export interface UserState {
  user: IUser | null;
}
