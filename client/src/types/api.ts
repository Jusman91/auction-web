import type { Dayjs } from 'dayjs';
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
  LOGGEDIN = 'loggedIn',
  AUCTION_ITEMS = 'auctionItems',
  CATEGORIES = 'categories',
  USERS = 'users'
}

export interface IQueryParams {
  page: number;
  sort: string | undefined;
  order: string | undefined;
  limit: number;
  search: string | undefined;
  category?: string | undefined;
  startTime?: string | Dayjs | undefined;
  endTime?: string | Dayjs | undefined;
}
export interface IResponseSuccess {
  data: [];
  limit: number;
  page: number;
  pageCount: number;
  totalData: number;
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

export type Role = 'Auctioneer' | 'Bidder' | 'Admin';
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
}
export interface IHandleLogin {
  formFields: ILoginFields;
}

export interface IItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  images?: string[];
  startingBid: number;
  currentBid: number;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  auctioneer: IUser;
  auctioneerId: string;
  bids?: [];
}

export interface ICategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
