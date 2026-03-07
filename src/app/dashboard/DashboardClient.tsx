'use client';
import { JSX, useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { FaBriefcase, FaCalendarCheck, FaEye, FaPlus } from 'react-icons/fa';
import {
    FaArrowRightFromBracket,
    FaCalendarDays,
    FaCircleExclamation,
    FaArrowRightFromBracket,
    FaCalendarDays,
    FaCircleExclamation,
} from 'react-icons/fa6';
import 'react-day-picker/style.css';
import { PopupTambahKegiatan } from '@/components/InputPopup';

// 1. Tambahkan userName pada interface
// 1. Tambahkan userName pada interface
interface DashboardClientProps {
    userEmail?: string | null;
    userName?: string | null;
    userEmail?: string | null;
    userName?: string | null;
}

interface Journal {
    id: number;
    tanggal: string;
    nama: string;
    deskripsi: string;
    imageUrl?: string;
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
    name: string;
    value: string;
    color: string;
    icon: JSX.Element;
    text_color: string;
}

export default function DashboardClient({ userEmail, userName }: DashboardClientProps) {
    const [selected, setSelected] = useState<Date | undefined>();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
export default function DashboardClient({ userEmail, userName }: DashboardClientProps) {
    const [selected, setSelected] = useState<Date | undefined>();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [stats, setStats] = useState<Stat[]>([]);
    const [kegiatanHariIni, setKegiatanHariIni] = useState<Journal[]>([]);
    const [riwayatKegiatan, setRiwayatKegiatan] = useState<Journal[]>([]);

    // Logika penentuan nama yang tampil
    const displayName = userName || (userEmail ? userEmail.split('@')[0] : 'Pengguna');
    const initial = displayName.charAt(0).toUpperCase();

    useEffect(() => {
        async function fetchData() {
            try {
                const [statsRes, todayRes, recentRes] = await Promise.all([
                    fetch('/api/journals/stats').then(res => res.json()),
                    fetch('/api/journals/today').then(res => res.json()),
                    fetch('/api/journals/recent').then(res => res.json()),
                ]);

                setStats([
                    {
                        name: 'Kegiatan Hari Ini',
                        value: statsRes.kegiatanHariIni.toString(),
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
                        text_color: '#272e6e',
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
        fetchData();
    }, []);

    return (
        <div className='flex flex-col min-h-screen items-start justify-start gap-8 w-full'>
            <div className='py-4 bg-white rounded-2xl p-4 w-full'>
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
                                <tr className='border-t border-slate-50'>
                                    <td className='p-3 font-medium'>
                                        Rapat Koordinasi Guru
                                    </td>
                                    <td className='p-3 text-sm text-slate-600'>
                                        Mengikuti rapat koordinasi bersama
                                        kepala sekolah dan guru.
                                    </td>
                                    <td className='text-center p-3 text-[#272e6e]'>
                                        <button className='hover:text-blue-500 transition'>
                                            <FaEye />
                                        </button>
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
                            {riwayatKegiatan.map(a => (
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
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className='min-w-66.5 flex flex-col gap-8 w-66.5'>
                    <div className='flex flex-col w-full h-fit bg-white rounded-2xl items-center justify-center gap-4 py-6 '>
                        {/* Avatar */}
                        <div className='bg-slate-200 size-25 rounded-full flex items-center justify-center text-[#272e6e] font-bold text-4xl uppercase'>
                            {initial}
                        </div>
                        {/* Nama & NIP */}
                        <div className='flex flex-col items-center justify-center'>
                            <span className='font-bold text-[18px] text-[#272e6e] text-center px-2'>
                                {displayName}
                            </span>
                            <span className='text-[10px] text-slate-400 mt-1 uppercase tracking-widest'>
                                NIP: 19900315 201802 1 001
                            </span>
                        </div>
                        <span className='px-4 py-1 bg-[#ffc65c] text-[#272e6e] text-xs font-bold rounded-full'>
                            Pendidik / Pengajar
                        </span>
                    </div>
                    <div className='bg-white rounded-2xl p-4 w-full'>
                        <DayPicker className='w-full' />
                    </div>
                </div>
            </div>
            <PopupTambahKegiatan
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            />
        </div>
    );
                {/* Right Side */}
                <div className='min-w-66.5 flex flex-col gap-8 w-66.5'>
                    <div className='flex flex-col w-full h-fit bg-white rounded-2xl items-center justify-center gap-4 py-6 '>
                        {/* Avatar */}
                        <div className='bg-slate-200 size-25 rounded-full flex items-center justify-center text-[#272e6e] font-bold text-4xl uppercase'>
                            {initial}
                        </div>
                        {/* Nama & NIP */}
                        <div className='flex flex-col items-center justify-center'>
                            <span className='font-bold text-[18px] text-[#272e6e] text-center px-2'>
                                {displayName}
                            </span>
                            <span className='text-[10px] text-slate-400 mt-1 uppercase tracking-widest'>
                                NIP: 19900315 201802 1 001
                            </span>
                        </div>
                        <span className='px-4 py-1 bg-[#ffc65c] text-[#272e6e] text-xs font-bold rounded-full'>
                            Pendidik / Pengajar
                        </span>
                    </div>
                    <div className='bg-white rounded-2xl p-4 w-full'>
                        <DayPicker className='w-full' />
                    </div>
                </div>
            </div>
            <PopupTambahKegiatan
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            />
        </div>
    );
}