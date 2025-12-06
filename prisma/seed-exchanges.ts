import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exchanges = [
    {
        name: 'Binance',
        logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
        url: 'https://www.binance.com',
        affiliateUrl: null,
        features: ['Spot Trading', 'Futures', 'Staking'],
        tradingVolume: '$76B Daily',
        kycRequired: true,
        rating: 4.8,
        sortOrder: 1,
        translations: [
            {
                locale: 'en',
                description: 'Binance Exchange is one of the most popular online exchanges in the world that offers trading in many different virtual coins.',
            },
            {
                locale: 'zh',
                description: 'Binance交易所是全球最受欢迎的在线交易所之一，提供多种虚拟货币的交易。',
            },
            {
                locale: 'fr',
                description: 'Binance Exchange est l\'une des bourses en ligne les plus populaires au monde qui propose le trading de nombreuses pièces virtuelles différentes.',
            },
        ],
    },
    {
        name: 'ByBit',
        logo: 'https://cryptologos.cc/logos/bybit-logo.png',
        url: 'https://www.bybit.com',
        affiliateUrl: null,
        features: ['Derivatives', 'Perpetual Contracts', 'Advanced Tools'],
        tradingVolume: '$20B Daily',
        kycRequired: false,
        rating: 4.6,
        sortOrder: 2,
        translations: [
            {
                locale: 'en',
                description: 'ByBit offers a wide range of advanced trading tools for futures and perpetual contracts trading.',
            },
            {
                locale: 'zh',
                description: 'ByBit为期货和永续合约交易提供广泛的高级交易工具。',
            },
            {
                locale: 'fr',
                description: 'ByBit offre une large gamme d\'outils de trading avancés pour le trading de contrats à terme et perpétuels.',
            },
        ],
    },
    {
        name: 'Hyperliquid',
        logo: 'https://pbs.twimg.com/profile_images/1732073429447581696/JKhN-rKo_400x400.jpg',
        url: 'https://hyperliquid.xyz',
        affiliateUrl: null,
        features: ['On-Chain DEX', 'Deep Liquidity', 'Airdrop Farming'],
        tradingVolume: '$5B Daily',
        kycRequired: false,
        rating: 4.7,
        sortOrder: 3,
        translations: [
            {
                locale: 'en',
                description: 'Hyperliquid is the leading on-chain derivatives DEX with deep liquidity and fast execution. It\'s also the top airdrop farm this cycle, rewarding active traders, LPs and stakers.',
            },
            {
                locale: 'zh',
                description: 'Hyperliquid是领先的链上衍生品DEX，具有深度流动性和快速执行。它也是本周期顶级空投农场，奖励活跃交易者、流动性提供者和质押者。',
            },
            {
                locale: 'fr',
                description: 'Hyperliquid est le principal DEX de produits dérivés en chaîne avec une liquidité profonde et une exécution rapide. C\'est également la meilleure ferme d\'airdrop de ce cycle, récompensant les traders actifs, les LP et les stakers.',
            },
        ],
    },
    {
        name: 'Bitget',
        logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11092.png',
        url: 'https://www.bitget.com',
        affiliateUrl: null,
        features: ['Spot', 'Futures', 'Copy Trading'],
        tradingVolume: '$12B Daily',
        kycRequired: true,
        rating: 4.5,
        sortOrder: 4,
        translations: [
            {
                locale: 'en',
                description: 'Bitget is an Asset Platform that gives you access to the Spot and Futures market.',
            },
            {
                locale: 'zh',
                description: 'Bitget是一个资产平台，让您可以访问现货和期货市场。',
            },
            {
                locale: 'fr',
                description: 'Bitget est une plateforme d\'actifs qui vous donne accès aux marchés Spot et Futures.',
            },
        ],
    },
    {
        name: 'Gate.io',
        logo: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/302.png',
        url: 'https://www.gate.io',
        affiliateUrl: null,
        features: ['Wide Selection', 'NFT Market', 'Lending'],
        tradingVolume: '$8B Daily',
        kycRequired: true,
        rating: 4.4,
        sortOrder: 5,
        translations: [
            {
                locale: 'en',
                description: 'Gate.io is a global cryptocurrency exchange that allows users to buy, sell, and trade cryptocurrencies, offering a variety of services.',
            },
            {
                locale: 'zh',
                description: 'Gate.io是一家全球加密货币交易所，允许用户购买、出售和交易加密货币，提供各种服务。',
            },
            {
                locale: 'fr',
                description: 'Gate.io est une bourse mondiale de cryptomonnaies qui permet aux utilisateurs d\'acheter, de vendre et d\'échanger des cryptomonnaies, offrant une variété de services.',
            },
        ],
    },
    {
        name: 'KuCoin',
        logo: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/311.png',
        url: 'https://www.kucoin.com',
        affiliateUrl: null,
        features: ['KCS Token', 'Trading Bot', 'Earn Products'],
        tradingVolume: '$6B Daily',
        kycRequired: false,
        rating: 4.5,
        sortOrder: 6,
        translations: [
            {
                locale: 'en',
                description: 'A global cryptocurrency exchange with unique features like its own native token (KCS) and the KuCoin Community Chain (KCC).',
            },
            {
                locale: 'zh',
                description: '全球加密货币交易所，具有独特功能，如自己的原生代币（KCS）和KuCoin社区链（KCC）。',
            },
            {
                locale: 'fr',
                description: 'Une bourse de cryptomonnaies mondiale avec des fonctionnalités uniques comme son propre jeton natif (KCS) et la chaîne communautaire KuCoin (KCC).',
            },
        ],
    },
    {
        name: 'Blofin',
        logo: 'https://pbs.twimg.com/profile_images/1726197562666790912/4XC5y9vt_400x400.jpg',
        url: 'https://blofin.com',
        affiliateUrl: null,
        features: ['Trending Altcoins', 'No KYC', 'Starter Bonuses'],
        tradingVolume: '$2B Daily',
        kycRequired: false,
        rating: 4.3,
        sortOrder: 7,
        translations: [
            {
                locale: 'en',
                description: 'Blofin is a fast-growing exchange known for quickly listing trending altcoins and airdrop opportunities. It offers strong starter bonuses and allows trading without KYC for smooth onboarding.',
            },
            {
                locale: 'zh',
                description: 'Blofin是一个快速增长的交易所，以快速上架趋势山寨币和空投机会而闻名。它提供强大的入门奖金，并允许无需KYC即可交易，实现顺畅的入门。',
            },
            {
                locale: 'fr',
                description: 'Blofin est une bourse en croissance rapide connue pour lister rapidement les altcoins tendance et les opportunités d\'airdrop. Elle offre de solides bonus de démarrage et permet le trading sans KYC pour un onboarding fluide.',
            },
        ],
    },
    {
        name: 'BitMEX',
        logo: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/157.png',
        url: 'https://www.bitmex.com',
        affiliateUrl: null,
        features: ['Perpetual Contracts', 'Options', 'High Leverage'],
        tradingVolume: '$3B Daily',
        kycRequired: true,
        rating: 4.2,
        sortOrder: 8,
        translations: [
            {
                locale: 'en',
                description: 'BitMEX offers a variety of cryptocurrency-based financial products, including perpetual contracts, futures contracts, and options contracts.',
            },
            {
                locale: 'zh',
                description: 'BitMEX提供各种基于加密货币的金融产品，包括永续合约、期货合约和期权合约。',
            },
            {
                locale: 'fr',
                description: 'BitMEX propose une variété de produits financiers basés sur les cryptomonnaies, y compris des contrats perpétuels, des contrats à terme et des contrats d\'options.',
            },
        ],
    },
];

async function seedExchanges() {
    console.log('Starting exchange seeding...');

    for (const exchangeData of exchanges) {
        const { translations, features, ...exchangeInfo } = exchangeData;

        // Create exchange with translations
        await prisma.exchange.create({
            data: {
                ...exchangeInfo,
                features: JSON.stringify(features),
                translations: {
                    create: translations,
                },
            },
        });

        console.log(`✓ Seeded exchange: ${exchangeData.name}`);
    }

    console.log('Exchange seeding completed!');
}

seedExchanges()
    .catch((e) => {
        console.error('Error seeding exchanges:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
