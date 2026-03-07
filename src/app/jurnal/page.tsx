'use client';
import { FaEye, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { PopupTambahKegiatan } from '@/components/InputPopup';

interface JournalEntry {
	tanggal: string;
	nama: string;
	deskripsi: string;
}

// Data dummy jurnal dengan atribut tanggal, nama, deskripsi
const journalEntries: JournalEntry[] = [
	{
		tanggal: '7 Maret 2026',
		nama: 'Mengajar Matematika Kelas VII',
		deskripsi:
			'Membahas materi pecahan dan persentase. Siswa aktif bertanya.',
	},
	{
		tanggal: '6 Maret 2026',
		nama: 'Rapat Koordinasi Guru',
		deskripsi:
			'Membahas persiapan ujian tengah semester dan pembagian tugas evaluasi.',
	},
	{
		tanggal: '5 Maret 2026',
		nama: 'Penyusunan RPP IPA',
		deskripsi: 'Menyusun RPP untuk materi IPA semester genap.',
	},
	{
		tanggal: '4 Maret 2026',
		nama: 'Evaluasi Hasil Belajar Siswa',
		deskripsi:
			'Melakukan koreksi dan evaluasi terhadap tugas dan ulangan siswa.',
	},
	{
		tanggal: '3 Maret 2026',
		nama: 'Mengajar Bahasa Indonesia Kelas VIII',
		deskripsi: 'Mengulas teks cerita pendek dan latihan menulis karangan.',
	},
	{
		tanggal: '2 Maret 2026',
		nama: 'Workshop Kurikulum',
		deskripsi: 'Mengikuti workshop terkait implementasi kurikulum merdeka.',
	},
	{
		tanggal: '1 Maret 2026',
		nama: 'Penyusunan Soal Ulangan',
		deskripsi:
			'Membuat soal ulangan harian untuk mata pelajaran IPA dan Matematika.',
	},
	{
		tanggal: '29 Februari 2026',
		nama: 'Kegiatan Ekstrakurikuler',
		deskripsi:
			'Membimbing siswa dalam kegiatan ekstrakurikuler Pramuka dan olahraga.',
	},
	{
		tanggal: '28 Februari 2026',
		nama: 'Rapat Persiapan Laporan Nilai',
		deskripsi:
			'Koordinasi dengan guru mata pelajaran lain untuk persiapan raport.',
	},
	{
		tanggal: '27 Februari 2026',
		nama: 'Mengajar IPS Kelas IX',
		deskripsi:
			'Membahas materi sejarah Indonesia pada masa penjajahan Belanda.',
	},
];

export default function Jurnal() {
	const [entries, setEntries] = useState<JournalEntry[]>(journalEntries);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

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
						{entries.map((entry, idx) => (
							<tr
								key={idx}
								className='border-t border-gray-200 hover:bg-gray-50 transition'>
								<td className='p-3'>{entry.tanggal}</td>
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
