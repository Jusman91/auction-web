import type {
  IForgotPasswordFields,
  ILoginFields,
  IRegisterFields,
  IResetPasswordFields
} from '.';

export enum MutationKeys {
  REGISTER = 'register',
  LOGIN = 'login',
  FORGOT_PASSWORD = 'forgotPassword',
  RESET_PASSWORD = 'resetPassword'
}
export enum QueryKeys {
  LOGGEDIN = 'loggedIn'
}

export type Register = IRegisterFields;
export type Login = ILoginFields;
export type ForgotPassword = IForgotPasswordFields;
export type ResetPassword = {
  formFields: IResetPasswordFields;
  id: string;
  token: string;
};

export interface IMessageResponse {
  message: string;
}
export interface IRegisterResponse extends IMessageResponse {}
export interface ILoginResponse extends IRegisterResponse {
  accessToken: string;
}
export interface IForgotPasswordResponse extends IMessageResponse {}
export interface IResetPasswordResponse extends IMessageResponse {}
export interface IDeleteUserResponse extends IMessageResponse {}

export type Role = 'Auctioneer' | 'Bedder' | 'Admin';
export interface IUser {
  id: string;
  name: string;
  slug: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  profilePic: string;
  role: Role;
}

export interface IHandleRegister {
  formFields: IRegisterFields;
  // openModal: () => void;
}
export interface IHandleLogin {
  formFields: ILoginFields;
  // openModal: () => void;
}
