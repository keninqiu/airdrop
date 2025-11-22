import prisma from '../../../lib/db';
import { NormalizedAirdropData } from '../sources/base-source';
import { createLogger } from '../utils/logger';

const logger = createLogger('DuplicateDetector');

export class DuplicateDetector {
    async findDuplicate(data: NormalizedAirdropData): Promise<number | null> {
        try {
            // Check by external ID first
            if (data.external_id) {
                const existing = await prisma.airdrop.findFirst({
                    where: { external_id: data.external_id },
                });
                if (existing) {
                    logger.debug(`Found duplicate by external_id: ${data.external_id}`);
                    return existing.id;
                }
            }

            // Check by URL
            if (data.campaign_url) {
                const existing = await prisma.airdrop.findFirst({
                    where: { campaign_url: data.campaign_url },
                });
                if (existing) {
                    logger.debug(`Found duplicate by URL: ${data.campaign_url}`);
                    return existing.id;
                }
            }

            // Check by name similarity
            const allAirdrops = await prisma.airdrop.findMany({
                include: {
                    translations: {
                        where: { locale: 'en' },
                    },
                },
            });

            for (const airdrop of allAirdrops) {
                const existingName = airdrop.translations[0]?.name || '';
                const newName = data.translations.find(t => t.locale === 'en')?.name || '';

                if (this.calculateSimilarity(existingName, newName) > 0.8) {
                    logger.debug(`Found duplicate by name similarity: ${existingName} ~ ${newName}`);
                    return airdrop.id;
                }
            }

            return null;
        } catch (error) {
            logger.error('Error checking for duplicates', error);
            return null;
        }
    }

    private calculateSimilarity(str1: string, str2: string): number {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;

        if (longer.length === 0) return 1.0;

        const editDistance = this.levenshteinDistance(longer.toLowerCase(), shorter.toLowerCase());
        return (longer.length - editDistance) / longer.length;
    }

    private levenshteinDistance(str1: string, str2: string): number {
        const matrix: number[][] = [];

        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[str2.length][str1.length];
    }
}
