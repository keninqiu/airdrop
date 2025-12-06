import db from '@/lib/db';

export interface Exchange {
    id: number;
    name: string;
    logo: string;
    url: string;
    affiliateUrl: string | null;
    features: string[];
    tradingVolume: string | null;
    kycRequired: boolean;
    rating: number | null;
    sortOrder: number;
    description: string;
}

export async function getAllExchanges(locale: string = 'en'): Promise<Exchange[]> {
    const exchanges = await db.exchange.findMany({
        where: {
            published: true,
        },
        include: {
            translations: {
                where: {
                    locale,
                },
            },
        },
        orderBy: {
            sortOrder: 'asc',
        },
    });

    return exchanges.map((exchange) => {
        const translation = exchange.translations[0];

        return {
            id: exchange.id,
            name: exchange.name,
            logo: exchange.logo,
            url: exchange.url,
            affiliateUrl: exchange.affiliateUrl,
            features: exchange.features ? JSON.parse(exchange.features) : [],
            tradingVolume: exchange.tradingVolume,
            kycRequired: exchange.kycRequired,
            rating: exchange.rating,
            sortOrder: exchange.sortOrder,
            description: translation?.description || '',
        };
    });
}

export async function getExchangeById(id: number, locale: string = 'en'): Promise<Exchange | null> {
    const exchange = await db.exchange.findUnique({
        where: { id },
        include: {
            translations: {
                where: {
                    locale,
                },
            },
        },
    });

    if (!exchange) {
        return null;
    }

    const translation = exchange.translations[0];

    return {
        id: exchange.id,
        name: exchange.name,
        logo: exchange.logo,
        url: exchange.url,
        affiliateUrl: exchange.affiliateUrl,
        features: exchange.features ? JSON.parse(exchange.features) : [],
        tradingVolume: exchange.tradingVolume,
        kycRequired: exchange.kycRequired,
        rating: exchange.rating,
        sortOrder: exchange.sortOrder,
        description: translation?.description || '',
    };
}
