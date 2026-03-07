import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
	try {
		const today = new Date();
		const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		const endOfMonth = new Date(
			today.getFullYear(),
			today.getMonth() + 1,
			0,
			23,
			59,
			59,
		);

		// Hitung kegiatan
		const kegiatanHariIni = await prisma.journal.count({
			where: {
				tanggal: {
					gte: new Date(
						today.getFullYear(),
						today.getMonth(),
						today.getDate(),
						0,
						0,
						0,
					),
					lte: new Date(
						today.getFullYear(),
						today.getMonth(),
						today.getDate(),
						23,
						59,
						59,
					),
				},
			},
		});

		const kegiatanBulanIni = await prisma.journal.count({
			where: {
				tanggal: {
					gte: startOfMonth,
					lte: endOfMonth,
				},
			},
		});

		const hariBelumMengisi = await prisma.journal.count({
			where: {
				tanggal: {
					lt: new Date(
						today.getFullYear(),
						today.getMonth(),
						today.getDate(),
						0,
						0,
						0,
					),
				},
			},
		});

		return NextResponse.json({
			kegiatanHariIni,
			kegiatanBulanIni,
			hariBelumMengisi,
		});
	} catch (error) {
		console.error('Error fetching stats:', error);
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
