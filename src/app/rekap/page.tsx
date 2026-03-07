"use client";

import Image from "next/image";
import logo from "../../../../public/logo-notes-smangad.png"; // Sesuaikan path logo kamu
import { FaPrint } from "react-icons/fa";

export default function RekapPage() {
    // Data Dummy Sementara (Nanti kita ganti dengan data dari MariaDB)
    const dummyData = [
        {
            id: 1,
            tanggal: "07 Maret 2026",
            nama: "Mengajar Kelas 10A - Matematika Lanjut",
            deskripsi: "Memberikan materi tentang matriks dan melakukan evaluasi harian. Siswa sangat antusias, namun ada 2 siswa yang perlu bimbingan tambahan.",
            imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop", // Gambar contoh
        },
        {
            id: 2,
            tanggal: "08 Maret 2026",
            nama: "Rapat Kordinasi Guru MIPA",
            deskripsi: "Membahas persiapan ujian tengah semester dan penyusunan kisi-kisi soal yang akan diunggah ke e-learning sekolah.",
            imageUrl: null, // Contoh kegiatan tanpa foto
        }
    ];

    // Fungsi untuk memicu fitur cetak/Save as PDF browser
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="w-full">
            {/* --- HEADER TOMBOL (Disembunyikan saat dicetak) --- */}
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

            {/* --- AREA KERTAS PDF (A4 Setup) --- */}
            {/* class "print:*" hanya akan aktif saat mode cetak/PDF */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 min-h-264 text-black print:p-0 print:shadow-none print:border-none print:m-0">
                
                {/* 1. KOP SEKOLAH */}
                <div className="flex items-center border-b-4 border-double border-black pb-4 mb-6">
                    <div className="w-24">
                        {/* Jika kamu punya logo sekolah resmi, ganti src-nya di sini */}
                        <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center font-bold text-xs text-center border-2 border-black">
                            LOGO
                        </div>
                    </div>
                    <div className="flex-1 text-center">
                        <h2 className="text-lg font-bold uppercase tracking-wider">Pemerintah Provinsi Jawa Tengah</h2>
                        <h1 className="text-2xl font-black uppercase tracking-widest mt-1">SMA Negeri 1 Angkasa (SMANGAD)</h1>
                        <p className="text-sm mt-1">Jl. Pendidikan No. 123, Kota Pelajar, Kode Pos 12345</p>
                        <p className="text-sm">Telepon: (021) 1234567 | Email: info@smangad.sch.id</p>
                    </div>
                    <div className="w-24"></div> {/* Spacer agar teks tetap di tengah */}
                </div>

                {/* 2. JUDUL DOKUMEN */}
                <div className="text-center mb-8">
                    <h3 className="text-xl font-bold uppercase underline underline-offset-4">Jurnal Kegiatan Harian Guru</h3>
                    <p className="mt-2 font-medium">Bulan: Maret 2026</p>
                </div>

                {/* 3. IDENTITAS USER */}
                <div className="mb-8 w-full md:w-2/3">
                    <table className="w-full text-left font-medium">
                        <tbody>
                            <tr>
                                <td className="py-1 w-40">Nama Lengkap</td>
                                <td className="py-1 w-4">:</td>
                                <td className="py-1">Elang Rama (Dummy)</td>
                            </tr>
                            <tr>
                                <td className="py-1">Email / NIP</td>
                                <td className="py-1">:</td>
                                <td className="py-1">admin@smangad.com</td>
                            </tr>
                            <tr>
                                <td className="py-1">Jabatan</td>
                                <td className="py-1">:</td>
                                <td className="py-1">Guru Mata Pelajaran</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. DAFTAR KEGIATAN & DOKUMENTASI */}
                <div className="flex flex-col gap-8">
                    {dummyData.map((kegiatan, index) => (
                        <div 
                            key={kegiatan.id} 
                            // break-inside-avoid agar 1 kegiatan tidak terpotong setengah halaman di PDF
                            className="print:break-inside-avoid border-l-4 border-[#262e6d] pl-4 py-2"
                        >
                            <h4 className="font-bold text-lg">{index + 1}. {kegiatan.nama}</h4>
                            <p className="text-sm text-slate-600 font-bold mb-2">{kegiatan.tanggal}</p>
                            <p className="text-justify mb-4">{kegiatan.deskripsi}</p>
                            
                            {/* Render Gambar Jika Ada */}
                            {kegiatan.imageUrl ? (
                                <div className="mt-2">
                                    <p className="text-sm italic text-slate-500 mb-1">Dokumentasi:</p>
                                    {/* Menggunakan div image agar styling responsif & rapi saat dicetak */}
                                    <img 
                                        src={kegiatan.imageUrl} 
                                        alt={`Dokumentasi ${kegiatan.nama}`}
                                        className="w-full max-w-100 h-auto rounded-lg border border-slate-300 shadow-sm"
                                    />
                                </div>
                            ) : (
                                <p className="text-sm italic text-slate-400 mt-2">- Tidak ada dokumentasi foto -</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* 5. TANDA TANGAN (Opsional di bagian bawah) */}
                <div className="mt-16 flex justify-end print:break-inside-avoid">
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