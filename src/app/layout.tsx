
import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { Providers } from '@/components/Providers';

import { Nunito } from 'next/font/google';

const nunito = Nunito({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Notes Smangad',
    description: 'Aplikasi pencatatan dengan sistem autentikasi',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body
                className={`${nunito.className} flex w-full min-h-screen h-screen bg-[#262e6d]`}
            >
                <Providers>
                    <div className='fixed left-0 h-screen'>
                        <Sidebar />
                    </div>
                    <div className='ms-70 p-6 w-full text-[#3e3e3e] bg-[#eeeef9] h-fit rounded-s-3xl'>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}