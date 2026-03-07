'use client';
import { FaEye, FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { PopupTambahKegiatan } from '@/components/InputPopup';

interface Journal {
	id: number;
	tanggal: string;
	nama: string;
	deskripsi: string;
	imageUrl: string | null;
}

// Data dummy jurnal dengan atribut tanggal, nama, deskripsi

export default function Jurnal() {
	const [journals, setJournals] = useState<Journal[]>([]);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	useEffect(() => {
		fetch('/api/journals')
			.then(res => res.json())
			.then(setJournals);
	}, []);

	return (
		<div className='flex flex-col min-h-screen gap-8 p-4'>
			{/* Header */}
			<div className='py-4 bg-white rounded-2xl px-4'>
				<span className='font-black text-[32px]'>Jurnal Harian</span>
			</div>

			{/* Tabel */}
			<div className='flex flex-col bg-white rounded-2xl p-4 overflow-x-auto'>
				<div className='flex items-center justify-between mb-4'>
					<span className='font-bold text-lg'>Daftar Jurnal</span>
					<button
						onClick={() => {
							setIsPopupOpen(true);
						}}
						className='px-4 py-2 flex items-center gap-2 rounded-md bg-[#ffc65c] text-sm font-bold'>
						<FaPlus /> Tambah Kegiatan
					</button>
				</div>

				<table className='w-full border-collapse text-sm rounded-lg overflow-clip'>
					<thead>
						<tr className='bg-gray-100 text-gray-600 text-xs'>
							<th className='text-left p-3'>Tanggal</th>
							<th className='text-left p-3'>Nama</th>
							<th className='text-left p-3'>Deskripsi</th>
							<th className='text-center p-3'>Lihat Detail</th>
						</tr>
					</thead>
					<tbody>
						{journals.map((entry, idx) => (
							<tr
								key={idx}
								className='border-t border-gray-200 hover:bg-gray-50 transition'>
								<td className='p-3'>
									{' '}
									{new Date(entry.tanggal).toLocaleDateString(
										'id-ID',
										{
											day: 'numeric',
											month: 'long',
											year: 'numeric',
										},
									)}
								</td>
								<td className='p-3 font-medium text-[#272e6e]'>
									{entry.nama}
								</td>
								<td className='p-3 text-slate-600'>
									{entry.deskripsi}
								</td>
								<td className='text-center p-3'>
									<button className='text-[#272e6e] hover:text-blue-500 transition'>
										<FaEye />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<PopupTambahKegiatan
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
			/>
		</div>
	);
}
