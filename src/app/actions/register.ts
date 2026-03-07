"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function registerUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email dan password wajib diisi!" };
    }

    try {
        // Cek apakah email sudah terdaftar
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "Email ini sudah digunakan!" };
        }

        // Enkripsi (Hash) password sebelum masuk ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan ke database
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return { success: true };
    } catch (error) {
        return { error: "Terjadi kesalahan pada server." };
    }
}