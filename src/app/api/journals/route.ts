import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route'; // sesuaikan dengan setup NextAuth

export async function GET(req: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.email) {
			return new Response(JSON.stringify({ error: 'Unauthorized' }), {
				status: 401,
			});
		}

		const email = session.user.email;

		// Ambil user berdasarkan email
		const user = await prisma.user.findUnique({
			where: { email },
			select: { id: true },
		});

		if (!user) {
			return new Response(JSON.stringify({ error: 'User not found' }), {
				status: 404,
			});
		}

		const journals = await prisma.journal.findMany({
			where: { userId: user.id },
			orderBy: { tanggal: 'desc' },
		});

		return new Response(JSON.stringify(journals), { status: 200 });
	} catch (error) {
		console.error('Error fetching journals for current user:', error);
		return new Response(JSON.stringify({ error: 'Server error' }), {
			status: 500,
		});
	}
}
