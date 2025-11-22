import Parser from 'rss-parser';
import { BaseSource, RawAirdropData } from './base-source';
import { crawlerConfig } from '../../../config/crawler.config';

export class RSSSource extends BaseSource {
    private parser: Parser;
    private feeds: string[];

    constructor() {
        super('RSS');
        this.parser = new Parser();
        this.feeds = crawlerConfig.sources.rss.feeds;
    }

    async fetch(): Promise<RawAirdropData[]> {
        const allItems: RawAirdropData[] = [];

        for (const feedUrl of this.feeds) {
            try {
                this.logger.info(`Fetching RSS feed: ${feedUrl}`);
                const feed = await this.parser.parseURL(feedUrl);

                for (const item of feed.items) {
                    // Only process items that mention "airdrop"
                    const title = item.title || '';
                    const content = item.contentSnippet || item.content || '';

                    if (this.isAirdropRelated(title, content)) {
                        const airdropData = this.parseItem(item, feedUrl);
                        if (airdropData) {
                            allItems.push(airdropData);
                        }
                    }
                }

                // Rate limiting
                await this.delay(crawlerConfig.rateLimit.delayBetweenRequests);
            } catch (error) {
                this.logger.error(`Failed to fetch RSS feed: ${feedUrl}`, error);
            }
        }

        this.logger.info(`Fetched ${allItems.length} airdrop items from RSS feeds`);
        return allItems;
    }

    private isAirdropRelated(title: string, content: string): boolean {
        const text = `${title} ${content}`.toLowerCase();
        return text.includes('airdrop') || text.includes('token distribution') || text.includes('free tokens');
    }

    private parseItem(item: any, source: string): RawAirdropData | null {
        try {
            const title = item.title || '';
            const description = item.contentSnippet || item.content || '';
            const fullText = `${title} ${description}`;

            return {
                title,
                description,
                url: item.link,
                imageUrl: item.enclosure?.url || item['media:thumbnail']?.['$']?.url,
                blockchain: this.extractBlockchain(fullText),
                startDate: item.pubDate ? new Date(item.pubDate) : undefined,
                source: `RSS: ${source}`,
                externalId: item.guid || item.link,
            };
        } catch (error) {
            this.logger.error('Failed to parse RSS item', error);
            return null;
        }
    }
}
