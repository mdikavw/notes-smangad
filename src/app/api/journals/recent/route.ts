import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
	try {
		const today = new Date();
		const startOfDay = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
			0,
			0,
			0,
		);

		// 5 kegiatan terakhir sebelum hari ini
		const recentJournals = await prisma.journal.findMany({
			where: {
				tanggal: { lt: startOfDay },
			},
			orderBy: { tanggal: 'desc' },
			take: 3,
		});

		return NextResponse.json(recentJournals);
	} catch (error) {
		console.error('Error fetching recent journals:', error);
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
