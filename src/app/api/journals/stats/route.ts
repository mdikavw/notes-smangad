// app/api/journals/stats/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
	try {
		// Misal email user dikirim sebagai query param: ?email=user@example.com
		const { searchParams } = new URL(req.url);
		const email = searchParams.get('email');
		if (!email)
			return NextResponse.json(
				{ error: 'Email user required' },
				{ status: 400 },
			);

		const user = await prisma.user.findUnique({
			where: { email },
			select: { id: true },
		});

		if (!user)
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 },
			);

		const today = new Date();
		const startOfToday = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
		);
		const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

		// 1. Kegiatan hari ini
		const kegiatanHariIni = await prisma.journal.findMany({
			where: {
				userId: user.id,
				tanggal: {
					gte: startOfToday,
					lt: new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000), // sampai akhir hari
				},
			},
			orderBy: { tanggal: 'asc' },
		});

		// 3. Hari belum mengisi bulan ini
		const journalsThisMonth = await prisma.journal.findMany({
			where: {
				userId: user.id,
				tanggal: { gte: startOfMonth, lt: startOfToday },
			},
			select: { tanggal: true },
		});

		const totalDaysSoFar = Math.floor(
			(startOfToday.getTime() - startOfMonth.getTime()) /
				(1000 * 60 * 60 * 24),
		);
		const daysFilled = journalsThisMonth.length;
		const hariBelumMengisi = totalDaysSoFar - daysFilled;

		// 4. Kegiatan bulan ini (total entri dari awal bulan)
		const kegiatanBulanIni = await prisma.journal.count({
			where: {
				userId: user.id,
				tanggal: {
					gte: startOfMonth,
					lt: new Date(today.getFullYear(), today.getMonth() + 1, 1),
				},
			},
		});

		return NextResponse.json({
			kegiatanHariIni,
			hariBelumMengisi,
			kegiatanBulanIni,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
