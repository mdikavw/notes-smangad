'use client';

import { updateUserProfile } from '@/app/actions/user';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProfileForm({ user }: any) {
	const [form, setForm] = useState({
		name: user.name || '',
		email: user.email || '',
		nip: user.nip || '',
		position: user.position || '',
	});

	const [initialForm] = useState(form);
	const [isChanged, setIsChanged] = useState(false);

	useEffect(() => {
		const changed =
			form.name !== initialForm.name ||
			form.email !== initialForm.email ||
			form.nip !== initialForm.nip ||
			form.position !== initialForm.position;

		setIsChanged(changed);
	}, [form, initialForm]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	const router = useRouter();
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!isChanged) return;

		setLoading(true);

		const formData = new FormData();
		formData.append('name', form.name);
		formData.append('email', form.email);
		formData.append('nip', form.nip);
		formData.append('position', form.position);

		const res = await updateUserProfile(formData);

		if (res.success) {
			alert('Profil berhasil diperbarui');
			router.refresh();
		} else {
			alert(res.error);
		}

		setLoading(false);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white rounded-2xl w-full p-8 flex gap-16 items-start'>
			{/* Avatar */}
			<div className='flex items-center justify-center mb-16 flex-col gap-8'>
				<div className='size-32 rounded-full bg-[#262e6d] text-white flex items-center justify-center text-3xl font-bold'>
					{form.name?.charAt(0) ?? 'U'}
				</div>
				{/* Bergabung */}
				<div>
					<p className='text-sm text-slate-400 font-semibold'>
						Bergabung Sejak
					</p>
					<p className='text-lg font-bold text-slate-700'>
						{new Date(user.createdAt).toLocaleDateString('id-ID')}
					</p>
				</div>
			</div>

			<div className='flex flex-col gap-6 w-full'>
				<div className='flex flex-col gap-1'>
					<label className='text-sm font-semibold text-slate-400'>
						Nama
					</label>
					<input
						name='name'
						value={form.name}
						onChange={handleChange}
						className='p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-[#ffc65c]'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<label className='text-sm font-semibold text-slate-400'>
						Email
					</label>
					<input
						name='email'
						value={form.email}
						onChange={handleChange}
						className='p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-[#ffc65c]'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<label className='text-sm font-semibold text-slate-400'>
						NIP
					</label>
					<input
						name='nip'
						value={form.nip}
						onChange={handleChange}
						className='p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-[#ffc65c]'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<label className='text-sm font-semibold text-slate-400'>
						Jabatan
					</label>
					<input
						name='position'
						value={form.position}
						onChange={handleChange}
						className='p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-[#ffc65c]'
					/>
				</div>
				<div className='w-full flex justify-end'>
					<button
						type='submit'
						disabled={!isChanged}
						className={`
						px-6 py-3 rounded-xl font-bold transition
						${
							isChanged
								? 'bg-[#ffc65c] text-[#262e6d] hover:bg-[#ffb937]'
								: 'bg-slate-200 text-slate-400 cursor-not-allowed'
						}
					`}>
						{loading ? 'Menyimpan...' : 'Simpan Perubahan'}
					</button>
				</div>
			</div>
		</form>
	);
}
