import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.email) {
			return new Response(JSON.stringify({ error: 'Unauthorized' }), {
				status: 401,
			});
		}

		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
			select: { id: true },
		});

		if (!user) {
			return new Response(JSON.stringify({ error: 'User not found' }), {
				status: 404,
			});
		}

		const today = new Date();
		const startOfDay = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
		);
		const endOfDay = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
			23,
			59,
			59,
		);

		const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		const endOfMonth = new Date(
			today.getFullYear(),
			today.getMonth() + 1,
			0,
			23,
			59,
			59,
		);

		const kegiatanHariIni = await prisma.journal.count({
			where: {
				userId: user.id,
				tanggal: { gte: startOfDay, lte: endOfDay },
			},
		});

		const kegiatanBulanIni = await prisma.journal.count({
			where: {
				userId: user.id,
				tanggal: { gte: startOfMonth, lte: endOfMonth },
			},
		});

		const hariBelumMengisi = await prisma.journal.count({
			where: { userId: user.id, tanggal: { lt: startOfDay } },
		});

		return new Response(
			JSON.stringify({
				kegiatanHariIni,
				kegiatanBulanIni,
				hariBelumMengisi,
			}),
			{ status: 200 },
		);
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Server error' }), {
			status: 500,
		});
	}
}
