import prisma from '../../lib/db';
import { RSSSource } from './sources/rss-source';
import { BaseSource } from './sources/base-source';
import { DataNormalizer } from './processors/data-normalizer';
import { NormalizedAirdropData } from './sources/base-source';
import { crawlerConfig } from '../../config/crawler.config';
import { createLogger } from './utils/logger';

const logger = createLogger('NewsCrawler');

export class AirdropCrawler {
    private sources: BaseSource[];
    private normalizer: DataNormalizer;

    constructor() {
        this.sources = [];

        // Initialize enabled sources
        if (crawlerConfig.sources.rss.enabled) {
            this.sources.push(new RSSSource());
        }

        this.normalizer = new DataNormalizer();
    }

    async run(): Promise<{ created: number; skipped: number; errors: number }> {
        logger.info('Starting news crawler...');

        const stats = {
            created: 0,
            skipped: 0,
            errors: 0,
        };

        try {
            // Fetch from all sources
            const allRawData = [];
            for (const source of this.sources) {
                try {
                    const data = await source.fetch();
                    allRawData.push(...data);
                } catch (error) {
                    logger.error(`Source ${source.name} failed`, error);
                    stats.errors++;
                }
            }

            logger.info(`Fetched ${allRawData.length} items from all sources`);

            // Normalize data
            const normalizedData = this.normalizer.normalizeMany(allRawData);
            logger.info(`Normalized ${normalizedData.length} items`);

            // Process each item
            for (const data of normalizedData) {
                try {
                    await this.processNewsItem(data, stats);
                } catch (error) {
                    logger.error('Failed to process news item', { data, error });
                    stats.errors++;
                }
            }

            logger.info('Crawler completed', stats);
        } catch (error) {
            logger.error('Crawler failed', error);
            throw error;
        }

        return stats;
    }

    private async processNewsItem(
        data: NormalizedAirdropData,
        stats: { created: number; skipped: number; errors: number }
    ): Promise<void> {
        // Check for duplicates by link
        try {
            const link = data.campaign_url || data.website_url || data.external_id || '#';

            const existing = await prisma.post.findFirst({
                where: { link },
            });

            if (existing) {
                logger.debug(`Skipping duplicate post: ${data.translations[0]?.name}`);
                stats.skipped++;
                return;
            }

            // Create post for this airdrop news
            const { translations } = data;

            await prisma.post.create({
                data: {
                    image: data.logo,
                    link,
                    translations: {
                        create: translations.map(t => ({
                            locale: t.locale,
                            title: t.name,
                            description: t.description,
                        })),
                    },
                },
            });

            logger.info(`Created post: ${translations[0]?.name}`);
            stats.created++;
        } catch (error) {
            logger.error('Failed to create post', { data, error });
            stats.errors++;
        }
    }
}
