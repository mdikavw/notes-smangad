'use server';

import { prisma } from '@/lib/prisma';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function getUserProfile() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		throw new Error('Unauthorized');
	}

	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email,
		},
	});

	console.log(user);

	return user;
}

export async function updateUserProfile(formData: FormData) {
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		return { success: false, error: 'Unauthorized' };
	}

	try {
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const nip = formData.get('nip') as string;
		const position = formData.get('position') as string;

		await prisma.user.update({
			where: {
				email: session.user.email,
			},
			data: {
				name,
				email,
				nip,
				position,
			},
		});

		return { success: true };
	} catch (error) {
		return {
			success: false,
			error: 'Gagal memperbarui profil',
		};
	}
}
