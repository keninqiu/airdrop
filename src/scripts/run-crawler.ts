#!/usr/bin/env node

import { CrawlerScheduler } from '../services/crawler/scheduler';

const args = process.argv.slice(2);
const mode = args[0] || 'once';

const scheduler = new CrawlerScheduler();

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down crawler...');
    scheduler.stop();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\nShutting down crawler...');
    scheduler.stop();
    process.exit(0);
});

async function main() {
    if (mode === 'daemon') {
        console.log('Starting crawler in daemon mode...');
        scheduler.start();

        // Keep process alive
        process.stdin.resume();
    } else {
        console.log('Running crawler once...');
        await scheduler.runOnce();
        process.exit(0);
    }
}

main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
