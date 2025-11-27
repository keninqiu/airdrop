import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AirdropList } from "@/components/sections/AirdropList";
import { getAirdrops } from "@/services/airdrop-service";
import { getTranslations } from 'next-intl/server';

export default async function AirdropsPage({ params }) {
    const { locale } = await params;
    const airdrops = await getAirdrops(locale);
    const t = await getTranslations('AllAirdropsPage');

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('heading')}</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        {t('description')}
                    </p>
                    <AirdropList airdrops={airdrops} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
