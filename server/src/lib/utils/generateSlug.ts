import prisma from '../../lib/prisma';
import slugify from 'slugify';
// import { nanoid } from 'nanoid';
import { GenerateSUniqueSlug } from '../../types';

export const generateUniqueSlug = async ({
	modelName,
	name,
}: GenerateSUniqueSlug) => {
	if (name) {
		let newSlug = slugify(name, {
			lower: true,
			strict: true,
		});
		const modelDelegate =
			prisma[modelName as keyof typeof prisma];
		const existingSlug = await (
			modelDelegate as any
		).findUnique({
			where: { slug: newSlug },
		});

		if (existingSlug) {
			const { nanoid } = await import('nanoid');
			newSlug = `${newSlug}-${nanoid(5)}`;
		}

		return newSlug;
	}
};
