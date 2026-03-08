import { getUserProfile } from '@/app/actions/user';
import ProfileForm from '@/components/ProfileForm';

export default async function ProfilePage() {
	const user = await getUserProfile();

	if (!user) {
		return <div>User tidak ditemukan</div>;
	}

	return (
		<div className='flex flex-col min-h-screen items-start justify-start gap-8 w-full'>
			<div className='py-4 bg-white rounded-2xl p-4 w-full'>
				<span className='font-black text-[32px]'>Profil Pegawai</span>
			</div>

			<ProfileForm user={user} />
		</div>
	);
}
