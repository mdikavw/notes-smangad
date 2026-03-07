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
		const endOfDay = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
			23,
			59,
			59,
		);

		const journalsToday = await prisma.journal.findMany({
			where: {
				tanggal: {
					gte: startOfDay,
					lte: endOfDay,
				},
			},
			orderBy: { tanggal: 'asc' },
		});

		return NextResponse.json(journalsToday);
	} catch (error) {
		console.error('Error fetching today journals:', error);
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
