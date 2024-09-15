import { Prisma } from '@prisma/client';
import { BuildCondition } from '../../../types';

export const buildEnumConditon = ({
	value,
}: BuildCondition): Prisma.EnumRoleFilter => {
	return {
		equals: value as Prisma.EnumRoleFilter['equals'],
	};
};
