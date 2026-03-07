"use server";
import { prisma } from "@/lib/prisma"; 
import bcrypt from "bcrypt";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword 
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Email sudah terdaftar!" };
  }
}