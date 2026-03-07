"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function tambahJurnal(formData: FormData) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return { success: false, error: "Anda belum login!" };
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return { success: false, error: "User tidak ditemukan di database." };
        }

        const tanggalStr = formData.get("tanggal") as string;
        const nama = formData.get("nama") as string;
        const deskripsi = formData.get("deskripsi") as string;

        if (!tanggalStr || !nama || !deskripsi) {
            return { success: false, error: "Data wajib belum lengkap." };
        }

        const file = formData.get("image") as File;
        let finalImageUrl: string | null = null; 


        if (file && file.size > 0) {
            
            if (!file.type.startsWith('image/')) {
                 return { success: false, error: "File yang diupload harus berupa gambar!" };
            }

            if (file.size > 5 * 1024 * 1024) {
                return { success: false, error: "Ukuran gambar maksimal 5MB." };
            }

            const uniqueFilename = `${Date.now()}_${file.name.replaceAll(' ', '_')}`;

            const uploadDir = path.join(process.cwd(), 'public/images');
            const filepath = path.join(uploadDir, uniqueFilename);

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await mkdir(uploadDir, { recursive: true });

            await writeFile(filepath, buffer);

            finalImageUrl = `/images/${uniqueFilename}`;
            
            console.log(`📸 Foto berhasil disimpan ke: ${filepath}`);
        }

        await prisma.journal.create({
            data: {
                tanggal: new Date(tanggalStr),
                nama,
                deskripsi,
                userId: user.id,
                imageUrl: finalImageUrl, 
            }
        });

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/rekap");

        return { success: true };
    } catch (error) {
        console.error("Gagal menyimpan jurnal:", error);
        return { success: false, error: "Terjadi kesalahan pada server." };
    }
}