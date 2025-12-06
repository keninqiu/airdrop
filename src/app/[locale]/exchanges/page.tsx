import { getTranslations } from 'next-intl/server';
import { getAllExchanges } from '@/services/exchange-service';
import ExchangeList from '@/components/sections/ExchangeList';

export default async function ExchangesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const exchanges = await getAllExchanges(locale);
    const t = await getTranslations('Exchanges');

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header Section */}
            <section className="bg-gradient-to-br from-primary/5 via-white to-primary/5 py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t('heading')}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600">
                            {t('description')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Exchanges Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exchanges.map((exchange) => (
                            <ExchangeList key={exchange.id} exchange={exchange} />
                        ))}
                    </div>

                    {exchanges.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">No exchanges available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    await params; // Ensure params is resolved
    const t = await getTranslations('Exchanges');

    return {
        title: `${t('heading')} - Airdrop Scan`,
        description: t('description'),
    };
}
