import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const data = await req.json();
        const {
            name,
            website_url,
            description,
            value,
            campaign_end,
            // Add other fields as needed
        } = data;

        if (!name || !description) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create user airdrop listing
        const listing = await db.userAirdropListing.create({
            data: {
                userId: parseInt(session.user.id),
                status: "Pending",
                value,
                website_url,
                campaign_end: campaign_end ? new Date(campaign_end) : null,
                translations: {
                    create: {
                        locale: "en", // Default to English for now
                        name,
                        description,
                    },
                },
            },
        });

        return NextResponse.json(
            { message: "Airdrop submitted successfully", id: listing.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
