"use client";

import Image from "next/image";
import logo from "../../../public/logo-sekolah.png";
import { FaPrint } from "react-icons/fa";

export default function RekapPage() {
    const dummyData = [
        {
            id: 1,
            tanggal: "07 Maret 2026",
            nama: "Mengajar Kelas 10A - Matematika Lanjut",
            deskripsi: "Memberikan materi tentang matriks dan melakukan evaluasi harian. Siswa sangat antusias, namun ada 2 siswa yang perlu bimbingan tambahan.",
            imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop", 
        },
        {
            id: 2,
            tanggal: "08 Maret 2026",
            nama: "Rapat Kordinasi Guru MIPA",
            deskripsi: "Membahas persiapan ujian tengah semester dan penyusunan kisi-kisi soal yang akan diunggah ke e-learning sekolah.",
            imageUrl: null, 
        }
    ];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6 print:hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-black text-[#262e6d]">Rekap Bulanan</h1>
                    <p className="text-slate-500 text-sm mt-1">Pratinjau laporan sebelum diunduh sebagai PDF.</p>
                </div>
                <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 bg-[#ffc65c] text-[#262e6d] px-6 py-3 rounded-xl font-bold hover:bg-[#ffb52e] hover:shadow-lg transition-all"
                >
                    <FaPrint />
                    <span>Cetak / Save PDF</span>
                </button>
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
                    <p className="mt-1 text-[12pt]">Bulan: Maret 2026</p>
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
                    {dummyData.map((kegiatan, index) => (
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
                    ))}
                </div>

                <div className="mt-16 flex justify-end print:break-inside-avoid text-[12pt]">
                    <div className="text-center w-64">
                        <p>Mengetahui,</p>
                        <p className="mb-20">Kepala Sekolah</p>
                        <p className="font-bold underline">Dr. Budi Santoso, M.Pd.</p>
                        <p>NIP. 19700101 199512 1 001</p>
                    </div>
                </div>

            </div>
        </div>
    );
}