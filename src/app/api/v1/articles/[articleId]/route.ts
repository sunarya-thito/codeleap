import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        message: 'This route is still a work in progress.'
    });
}
