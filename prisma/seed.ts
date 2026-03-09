import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
});
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('⏳ Memulai seeder...');

    // 1. Upsert User dengan field wajib: email, password, dan nip
    const user = await prisma.user.upsert({
        where: { id: 2 },
        update: {}, 
        create: {
            id: 2,
            name: 'Guru Pengajar',
            nip: '1234567890',          // <--- Tambahkan NIP (sesuaikan tipe datanya)
            email: 'guru@smangad.com',   // <--- Tambahkan Email
            password: 'password123',     // <--- Tambahkan Password
        },
    });

    const entries = [
        {
            tanggal: new Date('2026-03-07'),
            nama: 'Mengajar Matematika Kelas VII',
            deskripsi: 'Membahas materi pecahan dan persentase. Siswa aktif bertanya.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-03-06'),
            nama: 'Rapat Koordinasi Guru',
            deskripsi: 'Membahas persiapan ujian tengah semester dan pembagian tugas evaluasi.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-03-05'),
            nama: 'Penyusunan RPP IPA',
            deskripsi: 'Menyusun RPP untuk materi IPA semester genap.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-03-04'),
            nama: 'Evaluasi Hasil Belajar Siswa',
            deskripsi: 'Melakukan koreksi dan evaluasi terhadap tugas dan ulangan siswa.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-03-03'),
            nama: 'Mengajar Bahasa Indonesia Kelas VIII',
            deskripsi: 'Mengulas teks cerita pendek dan latihan menulis karangan.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-03-02'),
            nama: 'Workshop Kurikulum',
            deskripsi: 'Mengikuti workshop terkait implementasi kurikulum merdeka.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-03-01'),
            nama: 'Penyusunan Soal Ulangan',
            deskripsi: 'Membuat soal ulangan harian untuk mata pelajaran IPA dan Matematika.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-28'),
            nama: 'Kegiatan Ekstrakurikuler',
            deskripsi: 'Membimbing siswa dalam kegiatan ekstrakurikuler Pramuka dan olahraga.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-27'),
            nama: 'Rapat Persiapan Laporan Nilai',
            deskripsi: 'Koordinasi dengan guru mata pelajaran lain untuk persiapan raport.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-26'),
            nama: 'Mengajar IPS Kelas IX',
            deskripsi: 'Membahas materi sejarah Indonesia pada masa penjajahan Belanda.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-25'),
            nama: 'Pengisian Absensi Siswa',
            deskripsi: 'Memastikan seluruh data absensi siswa lengkap dan akurat.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-24'),
            nama: 'Bimbingan Konseling',
            deskripsi: 'Memberikan bimbingan kepada siswa terkait motivasi belajar.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-23'),
            nama: 'Pengawasan Ujian Harian',
            deskripsi: 'Menjadi pengawas ujian harian untuk kelas VII dan VIII.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-22'),
            nama: 'Rapat Evaluasi Guru',
            deskripsi: 'Diskusi tentang kinerja guru dan evaluasi pembelajaran.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-21'),
            nama: 'Mengajar IPA Kelas VII',
            deskripsi: 'Praktikum sederhana mengenai gaya dan gerak benda.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-20'),
            nama: 'Pelatihan Digitalisasi Nilai',
            deskripsi: 'Mengikuti pelatihan sistem digitalisasi penilaian siswa.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-19'),
            nama: 'Kegiatan Kebersihan Sekolah',
            deskripsi: 'Bersama siswa membersihkan lingkungan sekolah.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-18'),
            nama: 'Mengajar Bahasa Inggris Kelas VIII',
            deskripsi: 'Latihan percakapan dan pembelajaran kosakata baru.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-17'),
            nama: 'Rapat Koordinasi Kurikulum',
            deskripsi: 'Membahas strategi implementasi kurikulum merdeka.',
            imageUrl: '',
        },
        {
            tanggal: new Date('2026-02-16'),
            nama: 'Kegiatan Laboratorium',
            deskripsi: 'Eksperimen sederhana bersama siswa IPA kelas VII.',
            imageUrl: '',
        },
    ];

    // 2. Loop data dan masukkan ke tabel Journal
    for (const entry of entries) {
        await prisma.journal.create({
            data: {
                ...entry,
                userId: user.id,
            },
        });
    }

    console.log('✅ Seeder selesai: 20 data berhasil dimasukkan ke MariaDB!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error('❌ Terjadi kesalahan saat seeding:', e);
        await prisma.$disconnect();
        process.exit(1);
    });