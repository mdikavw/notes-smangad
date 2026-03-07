import { prisma } from '@/lib/prisma';

export async function DELETE(
	req: Request,
	context: { params: Promise<{ id: string }> },
) {
	try {
		// unwrap params promise
		const { id: idStr } = await context.params;

		const id = parseInt(idStr);
		if (isNaN(id)) {
			return new Response(JSON.stringify({ error: 'ID tidak valid' }), {
				status: 400,
			});
		}

		// Hapus jurnal
		await prisma.journal.delete({
			where: { id },
		});

		return new Response(JSON.stringify({ message: 'Berhasil dihapus' }), {
			status: 200,
		});
	} catch (error) {
		console.error('Error DELETE /journals/[id]:', error);
		return new Response(
			JSON.stringify({ error: 'Gagal menghapus jurnal' }),
			{ status: 500 },
		);
	}
}
