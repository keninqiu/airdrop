import React from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAirdropById } from "@/services/airdrop-service";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";

export default async function AirdropDetailsPage({ params }) {
    const { id, locale } = await params;
    const airdrop = await getAirdropById(parseInt(id), locale);

    if (!airdrop) {
        notFound();
    }

    // We can't use useTranslations directly in an async server component for the component body
    // But we can pass it down or use getTranslations if we needed server-side translations
    // For simplicity in this structure, we'll use client component for the content or just basic rendering
    // Actually, let's make a client component wrapper for the content if we need interactivity, 
    // but for now static content is fine.
    // However, to use `useTranslations` we need to be in a client component OR use `getTranslations`

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/airdrops"
                        className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Airdrops
                    </Link>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                <div className="flex items-center gap-6">
                                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-2xl p-4">
                                        <Image
                                            src={airdrop.logo}
                                            alt={airdrop.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                            {airdrop.name}
                                        </h1>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${airdrop.status === "Active" ? "bg-green-100 text-green-700" :
                                                airdrop.status === "Upcoming" ? "bg-blue-100 text-blue-700" :
                                                    "bg-gray-100 text-gray-600"
                                                }`}>
                                                {airdrop.status}
                                            </span>
                                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                                                {airdrop.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-sm text-gray-500 mb-1">Estimated Value</p>
                                    <p className="text-3xl font-bold text-gray-900">{airdrop.value}</p>
                                </div>
                            </div>

                            <div className="prose max-w-none">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">About this Airdrop</h3>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    {airdrop.description}
                                </p>

                                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-8">
                                    <h4 className="font-semibold text-blue-900 mb-2">How to Participate</h4>
                                    <ul className="list-disc list-inside text-blue-800 space-y-2">
                                        <li>Visit the official project website</li>
                                        <li>Connect your wallet</li>
                                        <li>Complete the required tasks</li>
                                        <li>Wait for the distribution date</li>
                                    </ul>
                                </div>

                                <button className="inline-flex items-center justify-center bg-primary hover:bg-primary-700 text-white px-8 py-4 text-lg font-medium rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    Participate Now <ExternalLink className="w-5 h-5 ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
