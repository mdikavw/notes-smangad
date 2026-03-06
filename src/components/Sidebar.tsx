import Image from 'next/image';
import { FaChartBar, FaHistory, FaHome } from 'react-icons/fa';
import { FaCalendarXmark } from 'react-icons/fa6';
import logo from '../../public/logo-notes-smangad.png';

const menus = [
	{
		menu: 'Dashboard',
		icon: <FaHome />,
		link: '/',
	},
	{
		menu: 'Jurnal Harian',
		icon: <FaHistory />,
		link: '/',
	},

	{
		menu: 'Rekap Bulanan',
		icon: <FaChartBar />,
		link: '/',
	},
];

export default function Sidebar() {
	return (
		<div className='w-70 bg-[#262e6d] py-8 flex flex-col h-full text-white font-bold'>
			<div className='w-full py-8 flex items-center justify-center'>
				<Image src={logo} alt={'logo'} />
			</div>
			<div className='flex flex-col w-full gap-4 px-8 py-4'>
				{menus.map(m => (
					<div
						className='flex justify-start items-center py-4 gap-4'
						key={m.menu}>
						<div className='text-[#ffc55c]'>{m.icon}</div>
						<span>{m.menu}</span>
					</div>
				))}
			</div>
		</div>
	);
}
