import type { FormInstance } from 'ant-design-vue';
import type {
  FormName,
  IForgotPasswordFields,
  IItem,
  ILoginFields,
  IRegisterFields,
  IResetPasswordFields,
  IResponseSuccess,
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
  item: ItemState;
};
export type NameSpace = 'form' | 'auth' | 'modal' | 'user' | 'item';
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

export interface ItemState {
  items: IItem[] | null;
  item: IItem | null;
  totalData: number;
  loading: boolean;
  error: string | null;
}
export enum MutationItemTypes {
  SET_ITEMS = 'SET_ITEMS',
  SET_ITEM = 'SET_ITEM',
  SET_CURRENT_BID = 'SET_CURRENT_BID',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR'
}
export enum ActionItemTypes {
  GET_ITEMS = 'GET_ITEMS',
  GET_ITEM = 'GET_ITEM'
}
export type MutationsItem = {
  [MutationItemTypes.SET_ITEMS](
    state: ItemState,
    payload: IItem[] | null
  ): void;
  [MutationItemTypes.SET_CURRENT_BID](
    state: ItemState,
    payload: number
  ): void;
  [MutationItemTypes.SET_LOADING](
    state: ItemState,
    payload: boolean
  ): void;
  [MutationItemTypes.SET_ERROR](
    state: ItemState,
    payload: string | null
  ): void;
};
export type ActionItem = {
  [ActionItemTypes.GET_ITEMS](
    context: ActionContext<ItemState, RootState>,
    payload: any
  ): Promise<void>;
  [ActionItemTypes.GET_ITEM](
    context: ActionContext<ItemState, RootState>,
    payload: any
  ): Promise<void>;
};
