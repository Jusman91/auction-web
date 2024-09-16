import prisma from '../../lib/prisma';
import { categories } from '../../mock.data/mockCategory';

async function main() {
	await prisma.category.deleteMany({});

	for (const category of categories) {
		await prisma.category.create({
			data: {
				name: category,
			},
		});
		console.log(
			`Kategori ${category} berhasil ditambahkan!`,
		);
	}
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
