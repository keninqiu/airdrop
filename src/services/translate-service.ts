/**
 * Translation service using MyMemory Translation API
 * 
 * MyMemory is a free translation API powered by the world's largest translation memory
 * Free tier: 1,000 words/day (anonymous), 10,000 words/day (with free email registration)
 * No credit card or billing account required
 * 
 * API: https://mymemory.translated.net/doc/spec.php
 */

const MYMEMORY_API_URL = 'https://api.mymemory.translated.net/get';
const MYMEMORY_EMAIL = process.env.MYMEMORY_EMAIL; // Optional, increases daily limit to 10,000 words

/**
 * Translate text from source language to target language
 * Preserves HTML tags and only translates the text content
 * 
 * @param text - The text to translate (can include HTML)
 * @param targetLocale - Target language code (e.g., 'es', 'fr', 'de')
 * @param sourceLocale - Source language code (default: 'en')
 * @returns Translated text
 */
export async function translateText(
    text: string,
    targetLocale: string,
    sourceLocale: string = 'en'
): Promise<string> {
    if (!text || !text.trim()) {
        return text;
    }

    // If source and target are the same, return original
    if (sourceLocale === targetLocale) {
        return text;
    }

    try {
        // Build query parameters
        const params = new URLSearchParams({
            q: text,
            langpair: `${sourceLocale}|${targetLocale}`,
        });

        // Add email if configured (increases daily limit)
        if (MYMEMORY_EMAIL) {
            params.append('de', MYMEMORY_EMAIL);
        }

        const url = `${MYMEMORY_API_URL}?${params.toString()}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Translation failed with status ${response.status}`);
        }

        const data = await response.json();

        // MyMemory returns translations in responseData.translatedText
        if (data.responseStatus !== 200) {
            throw new Error(data.responseDetails || 'Translation failed');
        }

        return data.responseData.translatedText;
    } catch (error) {
        console.error(`Translation error (${sourceLocale} -> ${targetLocale}):`, error);
        throw new Error(`Failed to translate text: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Translate multiple texts in batch
 * Note: MyMemory doesn't have native batch support,
 * so we translate texts sequentially with a small delay to avoid rate limiting
 * 
 * @param texts - Array of texts to translate
 * @param targetLocale - Target language code
 * @param sourceLocale - Source language code (default: 'en')
 * @returns Array of translated texts in same order
 */
export async function translateBatch(
    texts: string[],
    targetLocale: string,
    sourceLocale: string = 'en'
): Promise<string[]> {
    if (!texts || texts.length === 0) {
        return texts;
    }

    // If source and target are the same, return originals
    if (sourceLocale === targetLocale) {
        return texts;
    }

    try {
        // Translate each text sequentially with a small delay to avoid rate limiting
        const translations: string[] = [];

        for (const text of texts) {
            const translation = await translateText(text, targetLocale, sourceLocale);
            translations.push(translation);

            // Small delay to avoid rate limiting (100ms between requests)
            if (translations.length < texts.length) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        return translations;
    } catch (error) {
        console.error(`Batch translation error (${sourceLocale} -> ${targetLocale}):`, error);
        throw new Error(`Failed to translate batch: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
