export default function ProfileCard({ user }: { user?: any }) {
	return (
		<div className='flex flex-col w-full h-fit bg-white rounded-2xl items-center justify-center gap-4 py-6 '>
			<div className='bg-slate-200 size-25 rounded-full flex items-center justify-center text-[#272e6e] font-bold text-2xl uppercase'>
				{user?.name?.charAt(0) || 'U'}
			</div>

			<div className='flex flex-col items-center justify-center'>
				<span className='font-bold text-[18px] text-[#272e6e] text-center px-2'>
					{user?.name || 'User'}
				</span>

				<span className='text-[10px] text-slate-400 mt-1 uppercase tracking-widest'>
					NIP: {user?.nip || '-'}
				</span>
			</div>

			<span className='px-4 py-1 bg-[#ffc65c] text-[#272e6e] text-xs font-bold rounded-full'>
				{user?.position || 'Pegawai'}
			</span>
		</div>
	);
}
