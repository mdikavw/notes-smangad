'use client';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { FaCalendarCheck, FaEye, FaPlus } from 'react-icons/fa';
import {
	FaArrowRightFromBracket,
	FaCalendarDays,
	FaCircleExclamation,
} from 'react-icons/fa6';
import 'react-day-picker/style.css';

const stats = [
	{
		name: 'Kegiatan Hari Ini',
		value: '1',
		icon: <FaCalendarCheck />,
		color: '#d9dcf2',
		icon_color: '#272e6e',
	},
	{
		name: 'Kegiatan Bulan Ini',
		value: '27',
		icon: <FaCalendarDays />,
		color: '#fff1d6',
		icon_color: '#272e6e',
	},
	{
		name: 'Hari Belum Mengisi',
		value: '2',
		icon: <FaCircleExclamation />,
		color: '#FEE2E2',
		icon_color: '#e95d35',
	},
];

const activitiesHistory = [
	{
		date: '6 Maret 2026',
		name: 'Penyusunan RPP',
		description:
			'Menyusun rencana pelaksanaan pembelajaran (RPP) untuk mata pelajaran semester genap.',
	},
	{
		date: '5 Maret 2026',
		name: 'Mengajar Kelas VII',
		description:
			'Melaksanakan kegiatan pembelajaran di kelas VII sesuai dengan materi yang telah direncanakan.',
	},
	{
		date: '4 Maret 2026',
		name: 'Evaluasi Hasil Belajar',
		description:
			'Melakukan koreksi dan evaluasi terhadap hasil tugas dan ulangan siswa.',
	},
];

export default function Home() {
	const [selected, setSelected] = useState();
	return (
		<div className='flex flex-col min-h-screen items-start  justify-start gap-8 w-full'>
			<div className='py-4 bg-white rounded-2xl p-4 w-full bg-'>
				<span className='font-black text-[32px]'>Dashboard</span>
			</div>
			<div className='w-full flex gap-8'>
				{/* Left Side */}
				<div className='w-full flex flex-col gap-8'>
					{/* Stats */}
					<div className='w-full flex items-center justify-between gap-8'>
						{stats.map(s => (
							<div
								key={s.name}
								style={{ backgroundColor: s.color }}
								className={`rounded-2xl w-full px-8 py-4 flex items-center justify-start gap-4 text-[#0d1026]`}>
								{/* <div
									style={{ color: s.icon_color }}
									className='p-4 flex items-center justify-center rounded-full text-white bg-gray-100 text-3xl'>
									{s.icon}
								</div> */}
								<div className='flex flex-col'>
									<span className='text-sm'>{s.name}</span>
									<span className='font-bold text-[40px]'>
										{s.value}
									</span>
								</div>
							</div>
						))}
					</div>
					{/* Activity Table */}
					<div className='flex flex-col gap-4 rounded-2xl bg-white p-4 overflow-clip'>
						<div className='w-full flex items-center justify-between'>
							<span className='font-bold'>Kegiatan Hari Ini</span>
							<button className='px-4 py-2 flex items-center gap-2 rounded-md bg-[#ffc65c]  text-sm'>
								<FaPlus />
								<span>Tambah Kegiatan</span>
							</button>
						</div>
						<table className='w-full border-collapse'>
							<thead>
								<tr className='text-xs '>
									<th className='text-left p-3'>
										Nama Kegiatan
									</th>
									<th className='text-left p-3'>Deskripsi</th>
									<th className='text-center p-3'>
										Dokumentasi
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className=''>
									<td className='p-3'>
										Rapat Koordinasi Guru
									</td>
									<td className='p-3'>
										Mengikuti rapat koordinasi bersama
										kepala sekolah dan guru untuk membahas
										program kegiatan sekolah dan evaluasi
										pembelajaran.
									</td>
									<td className='text-center p-3 text-[#272e6e]'>
										<FaEye />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className='flex flex-col gap-4 '>
						<div className='w-full flex items-center justify-start'>
							<span className='font-bold'>Riwayat Kegiatan</span>
						</div>
						<div className='flex flex-col gap-4 font-medium'>
							{activitiesHistory.map(a => (
								<div
									key={a.name}
									className='rounded-xl bg-[#d9dcf2] p-4 flex gap-8'>
									<div className='h-full aspect-square bg-gray-500 rounded-md'></div>
									<div className='flex flex-col'>
										<span className='flex items-center font-extrabold'>
											{a.name}
										</span>
										<span className='flex items-center text-xs'>
											{a.date}
										</span>
										<span className='col-span-3'>
											{a.description}
										</span>
										<div className='mt-4 flex gap-4 items-center'>
											<span className='underline font-light'>
												Lihat Detail
											</span>
											<FaArrowRightFromBracket />
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				{/* Right Side */}
				<div className='min-w-66.5 flex flex-col gap-8 w-66.5'>
					<div className='flex flex-col w-full h-fit bg-white rounded-2xl items-center justify-center gap-4 py-6'>
						<div className='bg-gray-300 size-25 rounded-full'></div>
						<div className='flex flex-col items-center justify-center'>
							<span className='font-bold text-[20px] '>
								Suliono Albiantoro
							</span>
							<span className='text-sm'>
								{' '}
								19900315 201802 1 001
							</span>
						</div>
						<span className='font-medium '>Pengajar</span>
					</div>
					<div className='bg-white rounded-2xl p-4 w-full'>
						<DayPicker className='w-full' />
					</div>
				</div>
			</div>
		</div>
	);
}
