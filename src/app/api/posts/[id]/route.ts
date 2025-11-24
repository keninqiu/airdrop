import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        if (!params.id) {
            return new NextResponse("Post ID is required", { status: 400 });
        }

        const post = await db.post.findUnique({
            where: {
                id: parseInt(params.id),
            },
            include: {
                translations: true,
            },
        });

        if (!post) {
            return new NextResponse("Post not found", { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("[POST_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
