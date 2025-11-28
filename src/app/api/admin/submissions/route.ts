import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

export async function GET() {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const submissions = await db.userAirdropListing.findMany({
            where: {
                status: "Pending",
            },
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
                translations: {
                    where: {
                        locale: "en",
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(submissions);
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id, action } = await req.json();

        if (action === "reject") {
            await db.userAirdropListing.update({
                where: { id },
                data: { status: "Rejected" },
            });
            return NextResponse.json({ message: "Rejected" });
        }

        if (action === "approve") {
            const listing = await db.userAirdropListing.findUnique({
                where: { id },
                include: { translations: true },
            });

            if (!listing) {
                return NextResponse.json({ message: "Listing not found" }, { status: 404 });
            }

            // Create actual Airdrop
            const newAirdrop = await db.airdrop.create({
                data: {
                    logo: listing.logo || "/placeholder.png", // Default logo if missing
                    value: listing.value || "TBD",
                    status: "Active",
                    type: listing.type || "New",
                    website_url: listing.website_url,
                    campaign_url: listing.campaign_url,
                    whitepaper_url: listing.whitepaper_url,
                    reward_amount: listing.reward_amount,
                    campaign_end: listing.campaign_end,
                    approved: true,
                    translations: {
                        create: listing.translations.map((t) => ({
                            locale: t.locale,
                            name: t.name,
                            description: t.description,
                            steps: t.steps,
                        })),
                    },
                },
            });

            // Update listing status
            await db.userAirdropListing.update({
                where: { id },
                data: { status: "Approved" },
            });

            return NextResponse.json({ message: "Approved", airdropId: newAirdrop.id });
        }

        return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("Admin submission error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
