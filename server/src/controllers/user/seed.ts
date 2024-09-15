import { Role } from '@prisma/client';
import prisma from '../../lib/prisma';
import {
	encryptPassword,
	generateUniqueSlug,
} from '../../lib/utils';
import { mockUsers } from '../../mock.data/mockUser';

async function main() {
	// Hapus semua data untuk menghindari duplikasi
	await prisma.user.deleteMany({});

	for (const user of mockUsers) {
		const createSlug = await generateUniqueSlug({
			modelName: 'User',
			name: user.name,
		});
		const hashedPassword = await encryptPassword(
			user.password,
		);
		await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: hashedPassword,
				slug: createSlug!,
				phone: user.phone,
				address: user.address,
				profilePic: null,
				role: user.role as Role,
			},
		});
		console.log(`User ${user.name} berhasil ditambahkan!`);
	}
}

// Jalankan fungsi utama dan tutup Prisma Client
main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
