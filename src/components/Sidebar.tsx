'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { FaChartBar, FaHistory, FaHome, FaSignOutAlt } from 'react-icons/fa';
import logo from '../../public/logo-notes-smangad.png';

const menus = [
	{
		menu: 'Dashboard',
		icon: <FaHome />,
		link: '/dashboard',
	},
	{
		menu: 'Jurnal Harian',
		icon: <FaHistory />,
		link: '/jurnal',
	},
	{
		menu: 'Rekap Bulanan',
		icon: <FaChartBar />,
		link: '/dashboard/rekap',
	},
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<div className='w-70 bg-[#262e6d] py-8 flex flex-col h-full text-white font-bold shadow-2xl z-50'>
			<div className='w-full flex items-center justify-center px-6 mb-4'>
				<Image src={logo} alt='Logo Notes Smangad' priority />
			</div>

			<div className='flex flex-col w-full gap-2 px-4'>
				{menus.map(m => {
					const isActive = pathname === m.link;

					return (
						<Link
							href={m.link}
							key={m.menu}
							className={`flex justify-start items-center px-4 py-3 gap-4 rounded-xl transition-all duration-300 ${
								isActive
									? 'bg-[#ffc65c] text-[#262e6d] shadow-md'
									: 'hover:bg-white/10 text-white'
							}`}>
							<div
								className={`${isActive ? 'text-[#262e6d]' : 'text-[#ffc55c]'} text-xl transition-colors`}>
								{m.icon}
							</div>
							<span>{m.menu}</span>
						</Link>
					);
				})}
			</div>

			<div className='mt-auto px-4 w-full mb-6'>
				<button
					onClick={() => signOut({ callbackUrl: '/' })}
					className='w-full flex justify-start items-center px-4 py-3 gap-4 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300'>
					<div className='text-xl'>
						<FaSignOutAlt />
					</div>
					<span>Logout</span>
				</button>
			</div>
		</div>
	);
}
