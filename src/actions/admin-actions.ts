"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

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
    return await db.user.findMany({
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

    const user = await db.user.create({
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

    const user = await db.user.update({
        where: { id },
        data: updateData,
    });

    revalidatePath("/admin/users");
    return user;
}

export async function deleteUser(id: number) {
    await checkAdmin();

    await db.user.delete({
        where: { id },
    });

    revalidatePath("/admin/users");
}

// ============ AIRDROP ACTIONS ============

export async function getAirdrops() {
    await checkAdmin();
    return await db.airdrop.findMany({
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
    website_url?: string;
    campaign_url?: string;
    whitepaper_url?: string;
    reward_model?: string;
    reward_amount?: string;
    campaign_start?: string;
    campaign_end?: string;
    campaign_requirement?: string;
    blockchain?: string;
    translations: Array<{
        locale: string;
        name: string;
        description: string;
    }>;
}) {
    await checkAdmin();

    const airdrop = await db.airdrop.create({
        data: {
            logo: data.logo,
            value: data.value,
            status: data.status,
            type: data.type,
            website_url: data.website_url,
            campaign_url: data.campaign_url,
            whitepaper_url: data.whitepaper_url,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reward_model: data.reward_model as any,
            reward_amount: data.reward_amount,
            campaign_start: data.campaign_start ? new Date(data.campaign_start) : null,
            campaign_end: data.campaign_end ? new Date(data.campaign_end) : null,
            campaign_requirement: data.campaign_requirement,
            blockchain: data.blockchain,
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
        website_url?: string;
        campaign_url?: string;
        whitepaper_url?: string;
        reward_model?: string;
        reward_amount?: string;
        campaign_start?: string;
        campaign_end?: string;
        campaign_requirement?: string;
        blockchain?: string;
        translations?: Array<{
            locale: string;
            name: string;
            description: string;
        }>;
    }
) {
    await checkAdmin();

    const { translations, ...airdropData } = data;

    // Convert reward_model to enum and dates if present
    const updateData: Record<string, unknown> = { ...airdropData };
    if (data.reward_model) {
        updateData.reward_model = data.reward_model;
    }
    if (data.campaign_start) {
        updateData.campaign_start = new Date(data.campaign_start);
    }
    if (data.campaign_end) {
        updateData.campaign_end = new Date(data.campaign_end);
    }

    const airdrop = await db.airdrop.update({
        where: { id },
        data: updateData,
    });

    if (translations) {
        // Delete existing translations and create new ones
        await db.airdropTranslation.deleteMany({
            where: { airdropId: id },
        });

        await db.airdropTranslation.createMany({
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

    await db.airdrop.delete({
        where: { id },
    });

    revalidatePath("/admin/airdrops");
    revalidatePath("/");
}

// ============ POST ACTIONS ============

export async function getPosts() {
    await checkAdmin();
    return await db.post.findMany({
        include: {
            translations: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function createPost(data: {
    image: string;
    link: string;
    published?: boolean;
    translations: Array<{
        locale: string;
        title: string;
        description: string;
    }>;
}) {
    await checkAdmin();

    const post = await db.post.create({
        data: {
            image: data.image,
            link: data.link,
            published: data.published ?? true,
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
        published?: boolean;
        translations?: Array<{
            locale: string;
            title: string;
            description: string;
        }>;
    }
) {
    await checkAdmin();

    const { translations, ...postData } = data;

    const post = await db.post.update({
        where: { id },
        data: postData,
    });

    if (translations) {
        // Delete existing translations and create new ones
        await db.postTranslation.deleteMany({
            where: { postId: id },
        });

        await db.postTranslation.createMany({
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

    await db.post.delete({
        where: { id },
    });

    revalidatePath("/admin/posts");
    revalidatePath("/");
}
