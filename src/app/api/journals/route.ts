// app/api/journals/route.ts
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const adapter = new PrismaMariaDb({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: Number(process.env.DB_PORT) || 3306,
});
const prisma = new PrismaClient({ adapter });

export async function GET() {
	const journals = await prisma.journal.findMany({
		orderBy: { tanggal: 'desc' },
	});
	return new Response(JSON.stringify(journals), { status: 200 });
}
