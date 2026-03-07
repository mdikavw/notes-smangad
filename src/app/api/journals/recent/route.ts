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

		const recentJournals = await prisma.journal.findMany({
			where: { userId: user.id, tanggal: { lt: startOfDay } },
			orderBy: { tanggal: 'desc' },
			take: 5,
		});

		return new Response(JSON.stringify(recentJournals), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Server error' }), {
			status: 500,
		});
	}
}
