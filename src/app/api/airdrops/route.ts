import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
    try {
        const airdrops = await db.airdrop.findMany({
            include: {
                translations: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(airdrops);
    } catch (error) {
        console.error("[AIRDROPS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
