'use client';
import { JSX, useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { FaBriefcase, FaCalendarCheck, FaEye, FaPlus } from 'react-icons/fa';
import {
	FaArrowRightFromBracket,
	FaCalendarDays,
	FaCircleExclamation,
} from 'react-icons/fa6';
import 'react-day-picker/style.css';
import { PopupTambahKegiatan } from '@/components/InputPopup';
import { PopupViewKegiatan } from '@/components/ViewPopup';
import { getUserProfile } from '../actions/user';
import ProfileCard from '@/components/ProfileCard';
import Link from 'next/link';

// 1. Definisikan interface props agar tidak error di page.tsx
interface DashboardClientProps {
	userEmail?: string | null;
	user?: any;
}

interface Journal {
	id: number;
	tanggal: string;
	nama: string;
	deskripsi: string;
	imageUrl?: string;
}

interface Stat {
	name: string;
	value: string;
	color: string;
	icon: JSX.Element;
	text_color: string;
}

// 2. Ubah nama fungsi menjadi DashboardClient dan terima props userEmail
export default function DashboardClient({
	userEmail,
	user,
}: DashboardClientProps) {
	const [selected, setSelected] = useState<Date | undefined>();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [viewJournal, setViewJournal] = useState<Journal | null>(null);

	const [stats, setStats] = useState<Stat[]>([]);
	const [kegiatanHariIni, setKegiatanHariIni] = useState<Journal[]>([]);
	const [riwayatKegiatan, setRiwayatKegiatan] = useState<Journal[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				if (!userEmail) return;

				const [statsRes, todayRes, recentRes] = await Promise.all([
					fetch(`/api/journals/stats?email=${userEmail}`).then(res =>
						res.json(),
					),
					fetch(`/api/journals/today?email=${userEmail}`).then(res =>
						res.json(),
					),
					fetch(`/api/journals/recent?email=${userEmail}`).then(res =>
						res.json(),
					),
				]);

				setStats([
					{
						name: 'Kegiatan Hari Ini',
						value: statsRes.kegiatanHariIni.length.toString(), // ✅ pakai .length
						color: '#3d48ac',
						icon: <FaBriefcase />,
						text_color: '#fff',
					},
					{
						name: 'Kegiatan Bulan Ini',
						value: statsRes.kegiatanBulanIni.toString(),
						color: '#ffd382',
						icon: <FaCalendarCheck />,
						text_color: '#272e6e',
					},
					{
						name: 'Hari Belum Mengisi',
						value: statsRes.hariBelumMengisi.toString(),
						color: '#ee8264',
						icon: <FaCircleExclamation />,
						text_color: '#ffffff',
					},
				]);
				setKegiatanHariIni(todayRes);
				setRiwayatKegiatan(recentRes);
			} catch (error) {
				console.error('Fetch error:', error);
			}
		}

		fetchData();
	}, []);

	const handleView = (journal: Journal) => {
		setViewJournal(journal);
	};

	return (
		<div className='flex flex-col min-h-screen items-start justify-start gap-8 w-full'>
			<div className='py-4 bg-white rounded-2xl p-4 w-full flex justify-between items-center'>
				<span className='font-black text-[32px]'>Dashboard</span>
				<Link
					href={'/profile'}
					className='bg-slate-200 size-12 rounded-full flex items-center justify-center text-[#272e6e] font-bold text-lg uppercase'>
					{' '}
					{user?.name?.charAt(0) || 'U'}
				</Link>
			</div>
			<div className='w-full flex gap-8'>
				{/* Left Side */}
				<div className='w-full flex flex-col gap-8'>
					{/* Stats */}
					<div className='w-full flex items-center justify-between gap-8'>
						{stats.map(s => (
							<div
								key={s.name}
								className={`rounded-2xl bg-white w-full px-4 py-4 flex items-center justify-between gap-4 text-[#0d1026]`}>
								<div className='flex flex-col ps-4'>
									<span className='text-sm'>{s.name}</span>
									<span className='font-bold text-[32px]'>
										{s.value}
									</span>
								</div>
								<div
									className='flex items-center justify-center rounded-2xl p-6 text-xl'
									style={{
										backgroundColor: s.color,
										color: s.text_color,
									}}>
									{s.icon}
								</div>
							</div>
						))}
					</div>

					{/* Activity Table */}
					<div className='flex flex-col gap-4 rounded-2xl bg-white p-4 overflow-clip'>
						<div className='w-full flex items-center justify-between'>
							<span className='font-bold'>Kegiatan Hari Ini</span>
							<button
								onClick={() => {
									setIsPopupOpen(true);
								}}
								className='px-4 py-2 flex items-center gap-2 rounded-md bg-[#ffc65c] text-sm font-bold'>
								<FaPlus />
								<span>Tambah Kegiatan</span>
							</button>
						</div>
						<table className='w-full border-collapse'>
							<thead>
								<tr className='text-xs text-slate-400'>
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
								{kegiatanHariIni.length > 0 ? (
									kegiatanHariIni.map(entry => (
										<tr
											key={entry.id}
											className='border-t border-slate-50'>
											<td className='p-3 font-medium text-[#272e6e]'>
												{entry.nama}
											</td>
											<td className='p-3 text-slate-600'>
												{entry.deskripsi}
											</td>
											<td className='text-center p-3 text-[#272e6e]'>
												<button
													onClick={() =>
														handleView(entry)
													}
													className='text-[#272e6e] hover:text-blue-500 transition'>
													<FaEye />
												</button>
											</td>
										</tr>
									))
								) : (
									<tr className='border-t border-slate-50'>
										<td
											colSpan={3}
											className='text-center p-4 text-slate-400'>
											Belum ada kegiatan hari ini
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					<div className='flex flex-col gap-4 '>
						<div className='w-full flex items-center justify-start'>
							<span className='font-bold'>Riwayat Kegiatan</span>
						</div>
						<div className='flex flex-col gap-4 font-medium'>
							{riwayatKegiatan.length > 0 ? (
								riwayatKegiatan.map(a => (
									<div
										key={a.nama}
										className='rounded-xl bg-white p-4 flex gap-8'>
										<div className='h-full aspect-square bg-slate-400 rounded-md w-24'></div>
										<div className='flex flex-col'>
											<span className='flex items-center font-extrabold text-[#272e6e]'>
												{a.nama}
											</span>
											<span className='flex items-center text-xs opacity-70'>
												{new Date(
													a.tanggal,
												).toLocaleDateString('id-ID', {
													day: 'numeric',
													month: 'long',
													year: 'numeric',
												})}
											</span>
											<span className='mt-1 text-sm'>
												{a.deskripsi}
											</span>
											<div className='mt-4 flex gap-4 items-center cursor-pointer hover:translate-x-1 transition-transform'>
												<span className='underline font-light text-xs'>
													Lihat Detail
												</span>
												<FaArrowRightFromBracket
													size={12}
												/>
											</div>
										</div>
									</div>
								))
							) : (
								<span className='text-center p-4 text-slate-400'>
									Belum ada kegiatan
								</span>
							)}
						</div>
					</div>
				</div>

				{/* Right Side */}
				<div className='min-w-66.5 flex flex-col gap-8 w-66.5'>
					<ProfileCard user={user} />
					<div className='bg-white rounded-2xl p-4 w-full'>
						<DayPicker className='w-full' />
					</div>
				</div>
			</div>
			<PopupTambahKegiatan
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
			/>
			<PopupViewKegiatan
				isOpen={!!viewJournal}
				onClose={() => setViewJournal(null)}
				journal={viewJournal || undefined}
			/>
		</div>
	);
}
