"use client";

import Image from "next/image";
import logo from "../../../public/logo-sekolah.png";
import { FaPrint, FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import { useState } from "react";

export default function RekapPage() {
    const [selectedMonth, setSelectedMonth] = useState("2026-03");

    const dummyData = [
        {
            id: 1,
            rawDate: "2026-03-07", 
            tanggal: "07 Maret 2026",
            nama: "Mengajar Kelas 10A - Matematika Lanjut",
            deskripsi: "Memberikan materi tentang matriks dan melakukan evaluasi harian. Siswa sangat antusias, namun ada 2 siswa yang perlu bimbingan tambahan.",
            imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop", 
        },
        {
            id: 2,
            rawDate: "2026-03-08",
            tanggal: "08 Maret 2026",
            nama: "Rapat Kordinasi Guru MIPA",
            deskripsi: "Membahas persiapan ujian tengah semester dan penyusunan kisi-kisi soal yang akan diunggah ke e-learning sekolah.",
            imageUrl: null, 
        },
        {
            id: 3,
            rawDate: "2026-04-12", 
            tanggal: "12 April 2026",
            nama: "Pengawas Ujian Tengah Semester",
            deskripsi: "Menjadi pengawas ruangan 05 untuk ujian mata pelajaran Bahasa Indonesia dan Sejarah.",
            imageUrl: null, 
        }
    ];

    const filteredData = dummyData.filter(kegiatan => 
        kegiatan.rawDate.startsWith(selectedMonth)
    );

    const getFormattedMonth = (yyyymm: string) => {
        if (!yyyymm) return "-";
        const [year, month] = yyyymm.split("-");
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return `${months[parseInt(month) - 1]} ${year}`;
    };

    const handlePrint = () => {
        window.print();
    };

    const handleMonthChange = (offset: number) => {
        const [yearStr, monthStr] = selectedMonth.split('-');
        let year = parseInt(yearStr);
        let month = parseInt(monthStr);

        month += offset;

        if (month > 12) {
            month = 1;
            year += 1;
        } else if (month < 1) {
            month = 12;
            year -= 1;
        }

        const newMonthStr = month.toString().padStart(2, '0');
        setSelectedMonth(`${year}-${newMonthStr}`);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 print:hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-black text-[#262e6d]">Rekap Bulanan</h1>
                    {/* Teks ini penanda bahwa kodenya sudah versi terbaru */}
                    <p className="text-slate-500 text-sm mt-1">Pilih bulan dan pratinjau laporan sebelum dicetak.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                    
                    <div className="flex items-center gap-1 bg-slate-50 border-2 border-slate-100 rounded-xl p-1 focus-within:border-[#ffc65c] focus-within:ring-4 focus-within:ring-[#ffc65c]/20 transition-all">
                        
                        <button 
                            onClick={() => handleMonthChange(-1)}
                            className="p-2 text-slate-400 hover:text-[#262e6d] hover:bg-slate-200 rounded-lg transition-colors"
                            title="Bulan Sebelumnya"
                        >
                            <FaChevronLeft />
                        </button>

                        <div className="flex items-center gap-2 px-2">
                            <FaCalendarAlt className="text-slate-400" />
                            <input 
                                type="month" 
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="bg-transparent outline-none font-bold text-[#262e6d] cursor-pointer"
                            />
                        </div>

                        <button 
                            onClick={() => handleMonthChange(1)}
                            className="p-2 text-slate-400 hover:text-[#262e6d] hover:bg-slate-200 rounded-lg transition-colors"
                            title="Bulan Berikutnya"
                        >
                            <FaChevronRight />
                        </button>
                    </div>

                    <button 
                        onClick={handlePrint}
                        disabled={filteredData.length === 0}
                        className="flex items-center gap-2 bg-[#ffc65c] text-[#262e6d] px-6 py-3 rounded-xl font-bold hover:bg-[#ffb52e] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaPrint />
                        <span>Cetak PDF</span>
                    </button>
                </div>
            </div>

            <div 
                className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 min-h-264 text-black print:p-0 print:shadow-none print:border-none print:m-0"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
                <div className="flex items-center pb-3 mb-1 border-b-[3px] border-black relative">
                    <div className="w-24 flex justify-center">
                        <Image 
                            src={logo} 
                            alt="Logo SMA Negeri 1 Ngadirojo" 
                            width={90} 
                            height={90} 
                            className="object-contain"
                            priority 
                        />
                    </div>
                    <div className="flex-1 text-center leading-snug">
                        <h2 className="text-[12pt] font-bold uppercase">PEMERINTAH PROVINSI JAWA TIMUR</h2>
                        <h2 className="text-[12pt] font-bold uppercase">DINAS PENDIDIKAN</h2>
                        <h1 className="text-[14pt] font-bold uppercase">SMA NEGERI 1 NGADIROJO</h1>
                        <p className="text-[12pt]">JL.Lorok - Trenggalek No.39 Ds.Hadiluwih Kec.Ngadirojo Kab.Pacitan </p>
                        <p className="text-[12pt]">Telp.(0357) 3219778, Kode Pos: 63572 Email: smangad_pct10@gmail.com </p>
                    </div>
                    <div className="w-24"></div>
                </div>
                <div className="border-b border-black mb-6"></div>

                <div className="text-center mb-8">
                    <h3 className="text-[12pt] font-bold uppercase underline">Jurnal Kegiatan Harian Guru</h3>
                    <p className="mt-1 text-[12pt]">Bulan: {getFormattedMonth(selectedMonth)}</p>
                </div>

                <div className="mb-8 w-full">
                    <table className="text-left text-[12pt]">
                        <tbody>
                            <tr>
                                <td className="py-0.5 w-40">Nama Lengkap</td>
                                <td className="py-0.5 w-4">:</td>
                                <td className="py-0.5">Elang Rama (Dummy)</td>
                            </tr>
                            <tr>
                                <td className="py-0.5">Email / NIP</td>
                                <td className="py-0.5">:</td>
                                <td className="py-0.5">admin@smangad.com</td>
                            </tr>
                            <tr>
                                <td className="py-0.5">Jabatan</td>
                                <td className="py-0.5">:</td>
                                <td className="py-0.5">Guru Mata Pelajaran</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-6 text-[12pt]">
                    {filteredData.length === 0 ? (
                        <div className="text-center py-10 border-2 border-dashed border-slate-300 rounded-xl print:border-none">
                            <p className="text-slate-500 italic">Tidak ada catatan kegiatan pada bulan {getFormattedMonth(selectedMonth)}.</p>
                        </div>
                    ) : (
                        filteredData.map((kegiatan, index) => (
                            <div 
                                key={kegiatan.id} 
                                className="print:break-inside-avoid"
                            >
                                <p className="font-bold">
                                    {index + 1}. {kegiatan.nama} <span className="font-normal">({kegiatan.tanggal})</span>
                                </p>
                                <p className="text-justify mt-1 pl-4">
                                    {kegiatan.deskripsi}
                                </p>
                                {kegiatan.imageUrl && (
                                    <div className="mt-2 pl-4">
                                        <p className="italic mb-1">Dokumentasi:</p>
                                        <img 
                                            src={kegiatan.imageUrl} 
                                            alt={`Dokumentasi ${kegiatan.nama}`}
                                            className="w-full max-w-sm h-auto border border-black"
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {filteredData.length > 0 && (
                    <div className="mt-16 flex justify-end print:break-inside-avoid text-[12pt]">
                        <div className="text-center w-64">
                            <p>Mengetahui,</p>
                            <p className="mb-20">Kepala Sekolah</p>
                            <p className="font-bold underline">Drs. Budi Suryanto, MM.Pd.</p>
                            <p>NIP. -</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}