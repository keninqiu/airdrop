import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
    try {
        const posts = await db.post.findMany({
            include: {
                translations: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error("[POSTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
