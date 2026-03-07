import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { Providers } from '@/components/Providers';
import { Nunito } from 'next/font/google';

// 1. Import NextAuth untuk cek session di server
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const nunito = Nunito({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Notes Smangad',
    description: 'Aplikasi pencatatan dengan sistem autentikasi',
};

// 2. Ubah RootLayout menjadi async function
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // 3. Ambil data session
    const session = await getServerSession(authOptions);

    return (
        <html lang="id">
            <body className={`${nunito.className} flex w-full min-h-screen bg-[#262e6d]`}>
                <Providers>
                    {/* 4. Tampilkan Sidebar HANYA jika session ada (sudah login) */}
                    {session && (
                        <div className='fixed left-0 h-screen'>
                            <Sidebar />
                        </div>
                    )}
                    
                    {/* 5. Atur gaya container: Jika login, pakai gaya dashboard. Jika belum, full screen. */}
                    <div 
                        className={`
                            ${session 
                                ? 'ms-70 p-6 bg-[#eeeef9] rounded-s-3xl' // Gaya saat di Dashboard
                                : 'flex items-center justify-center w-full' // Gaya saat di halaman Login
                            } 
                            w-full text-[#3e3e3e] min-h-screen h-fit
                        `}
                    >
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}