import db from '@/lib/db';

export async function getPosts(locale: string, limit?: number) {
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
        ...(limit && { take: limit }),
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

export async function getPostsWithPagination(locale: string, page: number = 1, pageSize: number = 9) {
    const skip = (page - 1) * pageSize;

    const [posts, totalCount] = await Promise.all([
        db.post.findMany({
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
            skip,
            take: pageSize,
        }),
        db.post.count({
            where: {
                published: true,
            },
        }),
    ]);

    const mappedPosts = posts.map((post) => {
        const translation = post.translations[0] || {};
        return {
            ...post,
            title: translation.title || 'Untitled',
            description: translation.description || '',
        };
    });

    return {
        posts: mappedPosts,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: page,
    };
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

export async function getPreviousPost(id: number, locale: string) {
    const post = await db.post.findFirst({
        where: {
            id: { lt: id },
            published: true,
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

    if (!post) return null;

    const translation = post.translations[0] || {};
    return {
        id: post.id,
        title: translation.title || 'Untitled',
    };
}

export async function getNextPost(id: number, locale: string) {
    const post = await db.post.findFirst({
        where: {
            id: { gt: id },
            published: true,
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

    if (!post) return null;

    const translation = post.translations[0] || {};
    return {
        id: post.id,
        title: translation.title || 'Untitled',
    };
}
