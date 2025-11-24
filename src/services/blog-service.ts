import db from '@/lib/db';

export async function getPosts(locale: string) {
    const posts = await db.post.findMany({
        where: {
            published: true,
        },
        include: {
            translations: {
                where: { locale },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return posts.map((post) => {
        const translation = post.translations[0] || {};
        return {
            ...post,
            title: translation.title || 'Untitled',
            description: translation.description || '',
        };
    });
}

export async function getPostById(id: number, locale: string) {
    const post = await db.post.findUnique({
        where: { id },
        include: {
            translations: {
                where: { locale },
            },
        },
    });

    if (!post) return null;

    const translation = post.translations[0] || {};
    return {
        ...post,
        title: translation.title || 'Untitled',
        description: translation.description || '',
    };
}
