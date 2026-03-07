"use client";
import { registerUser } from "@/app/actions/register";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const res = await registerUser(formData);

        if (res.error) {
            setError(res.error);
            setLoading(false);
        } else {
            alert("Akun Smangad berhasil dibuat! Silakan login.");
            router.push("/");
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

            <form onSubmit={handleSubmit} className="relative z-10 bg-white p-8 rounded-2xl shadow-xl w-96 flex flex-col gap-4 border border-slate-200">
                <h1 className="text-2xl font-black text-[#262e6d] text-center">Buat Akun Baru</h1>
                <p className="text-sm text-center text-slate-500">Daftarkan akun untuk masuk ke Dashboard</p>
                
                {error && <p className="text-red-500 text-sm text-center font-bold bg-red-50 p-2 rounded">{error}</p>}
                
                <input name="email" type="email" placeholder="Email (misal: guru@smangad.com)" className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#262e6d] bg-slate-50" required />
                <input name="password" type="password" placeholder="Password (min. 6 karakter)" className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#262e6d] bg-slate-50" required minLength={6} />
                
                <button type="submit" disabled={loading} className="bg-[#262e6d] text-white font-bold py-3 rounded-xl hover:bg-[#1a2150] transition disabled:opacity-50 mt-2">
                    {loading ? "Menyimpan..." : "Daftar Sekarang"}
                </button>
                
                <p className="text-xs text-center text-gray-500 mt-2">
                    Sudah punya akun? <Link href="/" className="text-blue-600 font-bold hover:underline">Kembali ke Login</Link>
                </p>
            </form>
        </div>
    );
}