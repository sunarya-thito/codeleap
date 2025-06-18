import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaClient';

export async function GET(req: NextRequest) {
    try {
        const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
            SELECT tablename FROM pg_tables WHERE schemaname = 'public'
        `;
        const tableNames = tables.map(t => t.tablename);
        return NextResponse.json({ tables: tableNames });
    } catch (error) {
        return NextResponse.json({ error: 'Database connection failed', details: String(error) }, { status: 500 });
    }
}