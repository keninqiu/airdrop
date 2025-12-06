import { NextResponse } from 'next/server';
import { getAllExchanges } from '@/services/exchange-service';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get('locale') || 'en';

        const exchanges = await getAllExchanges(locale);

        return NextResponse.json(exchanges);
    } catch (error) {
        console.error('Error fetching exchanges:', error);
        return NextResponse.json(
            { error: 'Failed to fetch exchanges' },
            { status: 500 }
        );
    }
}
