import { RawAirdropData, NormalizedAirdropData } from '../sources/base-source';
import { createLogger } from '../utils/logger';

const logger = createLogger('DataNormalizer');

export class DataNormalizer {
    normalize(raw: RawAirdropData): NormalizedAirdropData {
        return {
            logo: raw.imageUrl || '/images/default-airdrop.png',
            value: this.extractValue(raw),
            status: this.determineStatus(raw),
            type: 'Normal', // Default type
            website_url: raw.url,
            campaign_url: raw.url,
            reward_amount: raw.reward,
            campaign_start: raw.startDate?.toISOString(),
            campaign_end: raw.endDate?.toISOString(),
            campaign_requirement: raw.requirements?.join(', '),
            blockchain: raw.blockchain?.join(', '),
            source: raw.source,
            external_id: raw.externalId,
            approved: false, // Requires admin approval by default
            translations: this.generateTranslations(raw),
        };
    }

    private extractValue(raw: RawAirdropData): string {
        // Try to extract value from reward or description
        if (raw.reward) {
            return raw.reward;
        }

        // Look for common patterns like "$100", "100 USDT", etc.
        const text = raw.description || raw.title;
        const valueMatch = text.match(/\$?\d+[\d,]*\.?\d*\s*(USD|USDT|tokens?|coins?)?/i);

        return valueMatch ? valueMatch[0] : 'TBA';
    }

    private determineStatus(raw: RawAirdropData): string {
        const now = new Date();

        if (raw.endDate && raw.endDate < now) {
            return 'Ended';
        }

        if (raw.startDate && raw.startDate > now) {
            return 'Upcoming';
        }

        return 'Active';
    }

    private generateTranslations(raw: RawAirdropData): Array<{ locale: string; name: string; description: string }> {
        const locales = ['en', 'zh', 'ja', 'ko', 'ru', 'es', 'fr', 'de', 'pt'];

        return locales.map(locale => ({
            locale,
            name: raw.title,
            description: raw.description || raw.title,
        }));
    }

    normalizeMany(rawData: RawAirdropData[]): NormalizedAirdropData[] {
        return rawData.map(raw => {
            try {
                return this.normalize(raw);
            } catch (error) {
                logger.error('Failed to normalize data', { raw, error });
                return null;
            }
        }).filter((item): item is NormalizedAirdropData => item !== null);
    }
}
