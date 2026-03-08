'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PopupViewKegiatanProps {
	isOpen: boolean;
	onClose: () => void;
	journal?: {
		tanggal: string;
		nama: string;
		deskripsi: string;
		imageUrl?: string | null;
	};
}

export function PopupViewKegiatan({
	isOpen,
	onClose,
	journal,
}: PopupViewKegiatanProps) {
	if (!isOpen || !journal) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4'>
			<div className='bg-white rounded-3xl p-6 md:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200'>
				<h2 className='text-2xl font-bold mb-4'>{journal.nama}</h2>
				<p className='text-sm text-gray-500 mb-2'>
					{new Date(journal.tanggal).toLocaleDateString('id-ID', {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}
				</p>
				<p className='text-gray-700 mb-4'>{journal.deskripsi}</p>

				{journal.imageUrl && (
					<div className='relative w-full h-64 mb-4 rounded-lg overflow-hidden'>
						<Image
							src={journal.imageUrl}
							alt={journal.nama}
							fill
							style={{ objectFit: 'cover' }}
						/>
					</div>
				)}

				<button
					onClick={onClose}
					className='mt-2 px-4 py-2 bg-[#272e6e] text-white rounded-md hover:bg-[#1f2655] transition'>
					Tutup
				</button>
			</div>
		</div>
	);
}
