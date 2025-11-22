# Airdrop Crawler Documentation

## Overview

The airdrop crawler is an automated system that fetches airdrop information from various internet sources and saves them to the database. It includes duplicate detection, data normalization, and an admin approval workflow.

**Key Feature**: The crawler creates **both** an Airdrop entry and a Post entry for each discovered airdrop, allowing the news to appear in both the airdrops section and the blog/news section of the site.

## Architecture

### Components

1. **Data Sources** (`src/services/crawler/sources/`)
   - `base-source.ts` - Abstract base class for all sources
   - `rss-source.ts` - RSS feed parser

2. **Processors** (`src/services/crawler/processors/`)
   - `data-normalizer.ts` - Converts raw data to database schema
   - `duplicate-detector.ts` - Detects duplicates using fuzzy matching

3. **Core Services**
   - `airdrop-crawler.ts` - Main orchestrator (creates both airdrops and posts)
   - `scheduler.ts` - Cron-based scheduler

4. **Configuration**
   - `src/config/crawler.config.ts` - Crawler settings
   - Environment variables for runtime configuration

## Usage

### Running Once

To run the crawler once manually:

```bash
npm run crawler:once
```

### Running as Daemon

To run the crawler as a background daemon:

```bash
npm run crawler:daemon
```

Press `Ctrl+C` to stop the daemon.

### Environment Variables

Add these to your `.env` file:

```bash
# Enable/disable the crawler
CRAWLER_ENABLED=false

# Cron schedule (every 6 hours by default)
CRAWLER_INTERVAL="0 */6 * * *"

# Auto-publish or require approval
CRAWLER_AUTO_PUBLISH=false

# Batch size
CRAWLER_BATCH_SIZE=10
```

## Features

### Dual Content Creation

For each airdrop discovered, the crawler creates:
1. **Airdrop Entry** - Full airdrop details with all metadata
2. **Post Entry** - News post about the airdrop for the blog section

This ensures airdrop news appears in both sections of the site, maximizing visibility.

### Duplicate Detection

The crawler uses three methods to detect duplicates:

1. **External ID** - Checks if the same item was already crawled
2. **URL matching** - Checks campaign URLs
3. **Fuzzy name matching** - Uses Levenshtein distance (80% similarity threshold)

### Data Normalization

Raw data from sources is normalized to match the database schema:

- Extracts blockchain information from text
- Parses dates and requirements
- Generates translations for all supported locales
- Determines airdrop status (Active/Upcoming/Ended)

### Admin Approval Workflow

By default, crawled airdrops are marked as `approved = false` and won't appear on the public site until an admin approves them. Set `CRAWLER_AUTO_PUBLISH=true` to auto-publish.

## Database Schema

New fields added to the `Airdrop` table:

- `source` - Where the airdrop was found (e.g., "RSS: https://...")
- `external_id` - Unique ID from the source system
- `approved` - Admin approval status (default: false)
- `crawled_at` - Timestamp when crawled

## Adding New Data Sources

To add a new data source:

1. Create a new class extending `BaseSource` in `src/services/crawler/sources/`
2. Implement the `fetch()` method
3. Add the source to `airdrop-crawler.ts` constructor
4. Update configuration in `crawler.config.ts`

Example:

```typescript
import { BaseSource, RawAirdropData } from './base-source';

export class MySource extends BaseSource {
    constructor() {
        super('MySource');
    }

    async fetch(): Promise<RawAirdropData[]> {
        // Fetch and return data
        return [];
    }
}
```

## Logging

Logs are output to console with timestamps and log levels:

```
[2025-01-22T12:00:00.000Z] [INFO] [Crawler] Starting airdrop crawler...
[2025-01-22T12:00:05.000Z] [INFO] [RSS] Fetched 10 airdrop items from RSS feeds
[2025-01-22T12:00:10.000Z] [INFO] [Crawler] Created new airdrop: Example Airdrop
```

## Production Deployment

### Using PM2

```bash
# Install PM2
npm install -g pm2

# Start crawler daemon
pm2 start npm --name "airdrop-crawler" -- run crawler:daemon

# View logs
pm2 logs airdrop-crawler

# Stop crawler
pm2 stop airdrop-crawler
```

### Using Systemd

Create `/etc/systemd/system/airdrop-crawler.service`:

```ini
[Unit]
Description=Airdrop Crawler Daemon
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/airdrop
ExecStart=/usr/bin/npm run crawler:daemon
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Then:

```bash
sudo systemctl enable airdrop-crawler
sudo systemctl start airdrop-crawler
sudo systemctl status airdrop-crawler
```

## Troubleshooting

### No airdrops being created

- Check if `CRAWLER_ENABLED=true` in `.env`
- Verify RSS feeds are accessible
- Check logs for errors
- Ensure database connection is working

### Duplicates being created

- Check duplicate detection logs
- Verify `external_id` is being set correctly
- Adjust similarity threshold in `crawler.config.ts`

### High memory usage

- Reduce `CRAWLER_BATCH_SIZE`
- Increase `delayBetweenRequests` for rate limiting
- Optimize duplicate detection (currently loads all airdrops)

## Future Enhancements

- Add more data sources (APIs, web scraping)
- Implement incremental crawling (only new items)
- Add webhook notifications for new airdrops
- Implement AI-based content extraction
- Add data quality scoring
- Create admin dashboard for crawler management
