"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Check if user is admin
async function checkAdmin() {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    return session;
}

// ============ USER ACTIONS ============

export async function getUsers() {
    await checkAdmin();
    return await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function createUser(data: {
    email: string;
    password: string;
    name?: string;
    role: string;
}) {
    await checkAdmin();

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            name: data.name,
            role: data.role,
        },
    });

    revalidatePath("/admin/users");
    return user;
}

export async function updateUser(
    id: number,
    data: {
        email?: string;
        password?: string;
        name?: string;
        role?: string;
    }
) {
    await checkAdmin();

    const updateData = { ...data };

    if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await prisma.user.update({
        where: { id },
        data: updateData,
    });

    revalidatePath("/admin/users");
    return user;
}

export async function deleteUser(id: number) {
    await checkAdmin();

    await prisma.user.delete({
        where: { id },
    });

    revalidatePath("/admin/users");
}

// ============ AIRDROP ACTIONS ============

export async function getAirdrops() {
    await checkAdmin();
    return await prisma.airdrop.findMany({
        include: {
            translations: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function createAirdrop(data: {
    logo: string;
    value: string;
    status: string;
    type: string;
    translations: Array<{
        locale: string;
        name: string;
        description: string;
    }>;
}) {
    await checkAdmin();

    const airdrop = await prisma.airdrop.create({
        data: {
            logo: data.logo,
            value: data.value,
            status: data.status,
            type: data.type,
            translations: {
                create: data.translations,
            },
        },
    });

    revalidatePath("/admin/airdrops");
    revalidatePath("/");
    return airdrop;
}

export async function updateAirdrop(
    id: number,
    data: {
        logo?: string;
        value?: string;
        status?: string;
        type?: string;
        translations?: Array<{
            locale: string;
            name: string;
            description: string;
        }>;
    }
) {
    await checkAdmin();

    const { translations, ...airdropData } = data;

    const airdrop = await prisma.airdrop.update({
        where: { id },
        data: airdropData,
    });

    if (translations) {
        // Delete existing translations and create new ones
        await prisma.airdropTranslation.deleteMany({
            where: { airdropId: id },
        });

        await prisma.airdropTranslation.createMany({
            data: translations.map((t) => ({
                ...t,
                airdropId: id,
            })),
        });
    }

    revalidatePath("/admin/airdrops");
    revalidatePath("/");
    return airdrop;
}

export async function deleteAirdrop(id: number) {
    await checkAdmin();

    await prisma.airdrop.delete({
        where: { id },
    });

    revalidatePath("/admin/airdrops");
    revalidatePath("/");
}

// ============ POST ACTIONS ============

export async function getPosts() {
    await checkAdmin();
    return await prisma.post.findMany({
        include: {
            translations: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function createPost(data: {
    image: string;
    link: string;
    translations: Array<{
        locale: string;
        title: string;
        description: string;
    }>;
}) {
    await checkAdmin();

    const post = await prisma.post.create({
        data: {
            image: data.image,
            link: data.link,
            translations: {
                create: data.translations,
            },
        },
    });

    revalidatePath("/admin/posts");
    revalidatePath("/");
    return post;
}

export async function updatePost(
    id: number,
    data: {
        image?: string;
        link?: string;
        translations?: Array<{
            locale: string;
            title: string;
            description: string;
        }>;
    }
) {
    await checkAdmin();

    const { translations, ...postData } = data;

    const post = await prisma.post.update({
        where: { id },
        data: postData,
    });

    if (translations) {
        // Delete existing translations and create new ones
        await prisma.postTranslation.deleteMany({
            where: { postId: id },
        });

        await prisma.postTranslation.createMany({
            data: translations.map((t) => ({
                ...t,
                postId: id,
            })),
        });
    }

    revalidatePath("/admin/posts");
    revalidatePath("/");
    return post;
}

export async function deletePost(id: number) {
    await checkAdmin();

    await prisma.post.delete({
        where: { id },
    });

    revalidatePath("/admin/posts");
    revalidatePath("/");
}
