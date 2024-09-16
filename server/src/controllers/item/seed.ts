import prisma from '../../lib/prisma';
import { generateUniqueSlug } from '../../lib/utils';
import { mockAuctionItems } from '../../mock.data/mockItem';

async function main() {
	// Hapus semua data untuk menghindari duplikasi
	await prisma.auctionItem.deleteMany({});

	for (const auctionItem of mockAuctionItems) {
		const createSlug = await generateUniqueSlug({
			modelName: 'AuctionItem',
			name: auctionItem.name,
		});

		await prisma.auctionItem.create({
			data: {
				name: auctionItem.name,
				slug: createSlug!,
				description: auctionItem.description,
				category: auctionItem.category,
				thumbnail: auctionItem.thumbnail,
				images: auctionItem.images,
				startingBid: auctionItem.startingBid,
				currentBid: auctionItem.currentBid,
				startTime: auctionItem.startTime,
				endTime: auctionItem.endTime,
				auctioneerId: auctionItem.auctioneerId,
			},
		});
		console.log(
			`Auction Item ${auctionItem.name} berhasil ditambahkan!`,
		);
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
