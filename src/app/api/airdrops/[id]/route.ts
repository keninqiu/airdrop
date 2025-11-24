import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return new NextResponse("Airdrop ID is required", { status: 400 });
        }

        const airdrop = await db.airdrop.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                translations: true,
            },
        });

        if (!airdrop) {
            return new NextResponse("Airdrop not found", { status: 404 });
        }

        return NextResponse.json(airdrop);
    } catch (error) {
        console.error("[AIRDROP_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
