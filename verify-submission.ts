
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const email = 'user_verification_1@example.com';
    console.log(`Promoting ${email} to ADMIN...`);

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (user) {
        await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' },
        });
        console.log(`User ${email} promoted to ADMIN.`);
    } else {
        console.log(`User ${email} not found.`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
