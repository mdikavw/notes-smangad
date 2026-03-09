"use server";

import { prisma } from "@/lib/prisma"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getJurnalByBulan(bulanStr: string) {
    try {
        // Cek sesi user yang sedang login
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return { success: false, error: "Belum login" };
        }

        // Cari ID user di database berdasarkan email sesi
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return { success: false, error: "User tidak ditemukan" };
        }

        // Buat range filter bulan (Tanggal 1 bulan ini s/d Tanggal 1 bulan berikutnya)
        const [year, month] = bulanStr.split("-");
        const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        const endDate = new Date(parseInt(year), parseInt(month), 1); 

        // Tarik data dari MariaDB
        const journals = await prisma.journal.findMany({
            where: {
                userId: user.id,
                tanggal: {
                    gte: startDate,
                    lt: endDate
                }
            },
            orderBy: {
                tanggal: 'asc' // Urutkan dari tanggal terlama ke terbaru
            }
        });

        return { 
            success: true, 
            data: journals,
            user: {
                nip: user.nip,
                jabatan: user.position
            }
        };
    } catch (error) {
        console.error("Gagal mengambil data rekap:", error);
        return { success: false, error: "Terjadi kesalahan server" };
    }
}