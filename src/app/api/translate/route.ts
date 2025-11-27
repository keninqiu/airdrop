import { NextRequest, NextResponse } from 'next/server';
import { translateText, translateBatch } from '@/services/translate-service';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { text, texts, targetLocale, sourceLocale = 'en' } = body;

        // Validate input
        if (!targetLocale) {
            return NextResponse.json(
                { error: 'Target locale is required' },
                { status: 400 }
            );
        }

        // Handle batch translation
        if (texts && Array.isArray(texts)) {
            if (texts.length === 0) {
                return NextResponse.json({ translations: [] });
            }

            const translations = await translateBatch(texts, targetLocale, sourceLocale);
            return NextResponse.json({ translations });
        }

        // Handle single text translation
        if (!text) {
            return NextResponse.json(
                { error: 'Text or texts array is required' },
                { status: 400 }
            );
        }

        const translatedText = await translateText(text, targetLocale, sourceLocale);
        return NextResponse.json({ translatedText });

    } catch (error) {
        console.error('Translation API error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Translation failed';

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
