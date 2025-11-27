import db from '@/lib/db';

export async function getAirdrops(locale: string, limit?: number) {
    const airdrops = await db.airdrop.findMany({
        include: {
            translations: {
                where: { locale },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        ...(limit && { take: limit }),
    });

    return airdrops.map((airdrop) => {
        const translation = airdrop.translations[0] || {};
        return {
            ...airdrop,
            name: translation.name || 'Unknown', // Fallback or handle missing translation
            description: translation.description || '',
        };
    });
}

export async function getAirdropById(id: number, locale: string) {
    const airdrop = await db.airdrop.findUnique({
        where: { id },
        include: {
            translations: {
                where: { locale },
            },
        },
    });

    if (!airdrop) return null;

    const translation = airdrop.translations[0] || {};
    return {
        ...airdrop,
        name: translation.name || 'Unknown',
        description: translation.description || '',
        steps: translation.steps || '',
    };
}

export async function getPreviousAirdrop(id: number, locale: string) {
    const airdrop = await db.airdrop.findFirst({
        where: {
            id: { lt: id },
        },
        orderBy: {
            id: 'desc',
        },
        include: {
            translations: {
                where: { locale },
            },
        },
    });

    if (!airdrop) return null;

    const translation = airdrop.translations[0] || {};
    return {
        id: airdrop.id,
        name: translation.name || 'Unknown',
    };
}

export async function getNextAirdrop(id: number, locale: string) {
    const airdrop = await db.airdrop.findFirst({
        where: {
            id: { gt: id },
        },
        orderBy: {
            id: 'asc',
        },
        include: {
            translations: {
                where: { locale },
            },
        },
    });

    if (!airdrop) return null;

    const translation = airdrop.translations[0] || {};
    return {
        id: airdrop.id,
        name: translation.name || 'Unknown',
    };
}
