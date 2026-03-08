// src/app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';
import { getUserProfile } from '../actions/user';

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	const user = await getUserProfile();

	if (!session) {
		redirect('/');
	}

	return <DashboardClient userEmail={session.user?.email} user={user} />;
}
