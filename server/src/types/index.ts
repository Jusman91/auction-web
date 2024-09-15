import { Prisma } from '@prisma/client';
import { Request } from 'express';

export interface ICustomError extends Error {
	status?: number;
	messages?: string[];
}
export type GenerateSUniqueSlug = {
	modelName: Prisma.ModelName;
	name: string;
};
export type Role = 'Auctioneer' | 'Bedder' | 'Admin';
export type validationSchema = (
	data: Request,
) => Promise<void | null>;
export type AuthValidationName =
	| 'register'
	| 'login'
	| 'forgot-password'
	| 'reset-password';
export type ValidationName = 'create' | 'update';
export type IUserPayload = {
	id: string;
	slug: string;
	role: Role;
};
export interface IUserRequest extends Request {
	user?: IUserPayload;
}
export type NodemailerSubject =
	| 'Verify_Email'
	| 'Forgot_Password';
export interface ISendMailParams {
	to: string;
	subject: NodemailerSubject;
	btnText: string;
	url: string;
}

export interface IUser {
	id?: string;
	name: string;
	slug?: string;
	email: string;
	password: string;
	address: string;
	phone: string;
	profilePic?: string;
	role?: Role;
}

export type OrderByWithRelationInput =
	Prisma.UserOrderByWithRelationInput[];
export type Pagination = {
	page: string | undefined;
	limit: string | undefined;
};
export type Query = { query: Request['query'] };
export type UserWhereInput = Prisma.UserWhereInput;
export type StringFilter = Prisma.StringFilter;
export type BuildCondition = {
	value: string;
	isInsensitive?: boolean;
};
export type BuildQuery = {
	query: Request['query'];
	fields: Field[];
};
export type Field =
	| 'name'
	| 'email'
	| 'phone'
	| 'categories'
	| 'address';
export type BuildSearchCondition = {
	search: string | undefined;
	fields: Field[];
};
export type BuildSortCondition = {
	sort: string | string[] | undefined;
	order: string | string[] | undefined;
};
export type BuildFilterAndSearchConditionReturn =
	UserWhereInput;
export type FilterCondition = UserWhereInput;
