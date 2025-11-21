import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const posts = await prisma.post.findMany({
        include: {
            translations: true
        }
    });
    console.log(`Found ${posts.length} posts`);
    console.log(JSON.stringify(posts, null, 2));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
