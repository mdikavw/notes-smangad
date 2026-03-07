'use client';

interface PopupTambahKegiatanProps {
	isOpen: boolean;
	onClose: () => void;
}

export function PopupTambahKegiatan({
	isOpen,
	onClose,
}: PopupTambahKegiatanProps) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
			<div className='bg-white rounded-2xl p-6 w-[80vw] h-[75vh] max-w-full'>
				<div className='flex justify-between items-center mb-4'>
					<span className='font-bold text-lg'>Tambah Kegiatan</span>
					<button
						onClick={onClose}
						className='text-slate-500 hover:text-slate-700 font-bold text-xl'>
						&times;
					</button>
				</div>

				<div className='h-40 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400'>
					Kongten Form Dimsini
				</div>
			</div>
		</div>
	);
}
