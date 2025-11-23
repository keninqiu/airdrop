import cron, { ScheduledTask } from 'node-cron';
import { AirdropCrawler } from './airdrop-crawler';
import { crawlerConfig } from '../../config/crawler.config';
import { createLogger } from './utils/logger';

const logger = createLogger('Scheduler');

export class CrawlerScheduler {
    private task: ScheduledTask | null = null;
    private crawler: AirdropCrawler;

    constructor() {
        this.crawler = new AirdropCrawler();
    }

    start(): void {
        if (!crawlerConfig.schedule.enabled) {
            logger.warn('Crawler is disabled in configuration');
            return;
        }

        logger.info(`Starting crawler scheduler with interval: ${crawlerConfig.schedule.interval}`);

        this.task = cron.schedule(crawlerConfig.schedule.interval, async () => {
            logger.info('Scheduled crawler run starting...');
            try {
                const stats = await this.crawler.run();
                logger.info('Scheduled crawler run completed', stats);
            } catch (error) {
                logger.error('Scheduled crawler run failed', error);
            }
        });

        logger.info('Crawler scheduler started successfully');
    }

    stop(): void {
        if (this.task) {
            this.task.stop();
            logger.info('Crawler scheduler stopped');
        }
    }

    async runOnce(): Promise<void> {
        logger.info('Running crawler once...');
        const stats = await this.crawler.run();
        logger.info('One-time crawler run completed', stats);
    }
}
