import db from '@/lib/db';

export async function getPosts(locale: string) {
    const posts = await db.post.findMany({
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
