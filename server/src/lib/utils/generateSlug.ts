import prisma from '../../lib/prisma';
import slugify from 'slugify';
import { GenerateSUniqueSlug } from '../../types';

export const generateUniqueSlug = async ({
	modelName,
	name,
}: GenerateSUniqueSlug) => {
	if (name) {
		let newSlug = slugify(name, {
			lower: true,
			// remove: /[*+~.()'"!:@]/g,
			strict: true,
		});
		const modelDelegate =
			prisma[modelName as keyof typeof prisma];
		let existingSlug = await (
			modelDelegate as any
		).findUnique({
			where: { slug: newSlug },
		});

		let suffix = 1;
		while (existingSlug) {
			newSlug = `${newSlug}-${suffix}`;
			existingSlug = await (
				modelDelegate as any
			).findUnique({
				where: { slug: newSlug },
			});
			suffix++;
		}

		return newSlug;
	}
};
