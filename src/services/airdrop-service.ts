import db from '@/lib/db';

export async function getAirdrops(locale: string) {
    const airdrops = await db.airdrop.findMany({
        include: {
            translations: {
                where: { locale },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
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
    };
}
