export const crawlerConfig = {
    // Scheduling
    schedule: {
        enabled: process.env.CRAWLER_ENABLED === 'true',
        interval: process.env.CRAWLER_INTERVAL || '0 */6 * * *', // Every 6 hours by default
    },

    // Data sources
    sources: {
        rss: {
            enabled: true,
            feeds: [
                // Major crypto news outlets
                'https://cryptonews.com/news/feed/',
                'https://cointelegraph.com/rss',
                'https://www.coindesk.com/arc/outboundfeeds/rss/',
                'https://decrypt.co/feed',
                'https://www.theblockcrypto.com/rss.xml',
                'https://bitcoinist.com/feed/',

                // Additional crypto news sources
                'https://cryptopotato.com/feed/',
                'https://cryptoslate.com/feed/',
                'https://beincrypto.com/feed/',
                'https://u.today/rss',
                'https://ambcrypto.com/feed/',
                'https://cryptobriefing.com/feed/',
                'https://www.newsbtc.com/feed/',

                // Blockchain and DeFi focused
                'https://blockworks.co/feed',
                'https://thedefiant.io/feed/',

                // More crypto news sites (verified working)
                'https://coinpedia.org/feed/',
                'https://coinjournal.net/feed/',
                'https://coingape.com/feed/',
                'https://www.crypto-news-flash.com/feed/',
                'https://cryptodaily.co.uk/feed',
                'https://cryptomode.com/feed/',
                'https://dailycoin.com/feed/',

                // Regional and specialized
                'https://www.coinbureau.com/feed/',
                'https://coingeek.com/feed/',
                'https://coinmarketcap.com/headlines/rss',
                'https://cryptonewsz.com/feed/',
                'https://www.coinspeaker.com/feed/',

                // Additional sources
                'https://bitcoinmagazine.com/.rss/full/',
                'https://www.coininsider.com/feed/',
                'https://cryptoadventure.com/feed/',
            ],
        },
        api: {
            enabled: false,
            // Add API configurations here
        },
    },

    // Behavior
    autoPublish: process.env.CRAWLER_AUTO_PUBLISH === 'true', // false = pending approval
    batchSize: parseInt(process.env.CRAWLER_BATCH_SIZE || '10'),

    // Rate limiting
    rateLimit: {
        requestsPerMinute: 30,
        delayBetweenRequests: 2000, // ms
    },

    // Duplicate detection
    duplicateThreshold: 0.8, // Similarity threshold for fuzzy matching
};
