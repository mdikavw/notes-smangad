"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import logo from '../../public/logo-notes-smangad-alt.png';

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Email atau Password salah!");
        } else {
            router.push("/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#262e6d] overflow-hidden">
            
            <div 
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(#ffc65c 1px, transparent 2px),
                        linear-gradient(90deg, #ffc65c 1px, transparent 2px)
                    `,
                    backgroundSize: '40px 40px', 
                    backgroundPosition: 'center center'
                }}
            ></div>

            <form onSubmit={handleLogin} className="relative z-10 bg-white p-8 rounded-2xl shadow-xl w-96 flex flex-col gap-4 border border-white/20">
                <Image src={logo} alt='Logo Notes Smangad' priority className="mx-auto" />
                
                {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}
                
                <input name="email" type="email" placeholder="Email" className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#262e6d]" required />
                <input name="password" type="password" placeholder="Password" className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#262e6d]" required />
                
                <button type="submit" className="bg-[#ffc65c] text-[#262e6d] font-bold py-3 rounded-xl hover:bg-[#ffb52e] transition">
                    Masuk ke Dashboard
                </button>
                
                <p className="text-xs text-center text-gray-500">
                    Belum punya akun? <Link href="/register" className="text-blue-600 font-bold hover:underline">Daftar disini</Link>
                </p>
            </form>
        </div>
    );
}