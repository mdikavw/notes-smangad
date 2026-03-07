'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Tambahkan ini
import { tambahJurnal } from '@/app/actions/jurnal'; // Import Server Action kita

interface PopupTambahKegiatanProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PopupTambahKegiatan({
    isOpen,
    onClose,
}: PopupTambahKegiatanProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Inisialisasi router

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        // Bungkus data form
        const formData = new FormData(e.currentTarget);
        
        // Panggil server action ke MariaDB
        const res = await tambahJurnal(formData);

        if (res.success) {
            alert("Jurnal berhasil disimpan!");
            router.refresh(); // Refresh halaman agar data baru langsung muncul
            onClose(); // Tutup popup
        } else {
            alert("Gagal menyimpan: " + res.error);
        }

        setLoading(false);
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#262e6d]/40 backdrop-blur-sm p-4'>
            <div className='bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200'>
                
                <div className='flex justify-between items-center mb-6 border-b-2 border-slate-100 pb-4'>
                    <div>
                        <h2 className='font-black text-2xl text-[#262e6d] tracking-tight'>Tambah Jurnal Baru</h2>
                        <p className='text-sm text-slate-500 font-medium mt-1'>Catat kegiatan harianmu di sini.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className='text-slate-400 hover:text-red-500 transition-colors font-bold text-3xl leading-none bg-slate-100 hover:bg-red-50 w-10 h-10 rounded-full flex items-center justify-center pb-1'>
                        &times;
                    </button>
                </div>

                {/* --- FORM TETAP SAMA SEPERTI MILIKMU --- */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-[#262e6d] ml-1">Tanggal Kegiatan</label>
                        <input
                            type="date"
                            name="tanggal"
                            required
                            className="p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-[#ffc65c] focus:ring-4 focus:ring-[#ffc65c]/20 transition-all font-medium text-slate-700 w-full bg-slate-50"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-[#262e6d] ml-1">Nama Kegiatan</label>
                        <input
                            type="text"
                            name="nama"
                            placeholder="Contoh: Mengajar Kelas 10A"
                            required
                            className="p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-[#ffc65c] focus:ring-4 focus:ring-[#ffc65c]/20 transition-all font-medium text-slate-700 w-full bg-slate-50"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-[#262e6d] ml-1">Deskripsi Lengkap</label>
                        <textarea
                            name="deskripsi"
                            rows={4}
                            placeholder="Ceritakan detail kegiatan hari ini..."
                            required
                            className="p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-[#ffc65c] focus:ring-4 focus:ring-[#ffc65c]/20 transition-all font-medium text-slate-700 w-full resize-none bg-slate-50"
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-[#262e6d] ml-1">
                            Foto Dokumentasi <span className="text-slate-400 font-normal">(Opsional)</span>
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-[#ffc65c] focus:ring-4 focus:ring-[#ffc65c]/20 transition-all font-medium text-slate-700 w-full bg-slate-50
                            file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#ffc65c]/20 file:text-[#262e6d] hover:file:bg-[#ffc65c]/40 file:transition-colors file:cursor-pointer"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t-2 border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 rounded-xl font-bold bg-[#262e6d] text-white hover:bg-[#1a2150] transition-all shadow-lg shadow-[#262e6d]/30 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                            {loading ? 'Menyimpan...' : 'Simpan Jurnal'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}