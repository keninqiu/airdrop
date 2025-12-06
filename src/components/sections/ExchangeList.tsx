"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Star, TrendingUp, ShieldCheck, ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";

interface ExchangeCardProps {
    exchange: {
        id: number;
        name: string;
        logo: string;
        url: string;
        affiliateUrl: string | null;
        features: string[];
        tradingVolume: string | null;
        kycRequired: boolean;
        rating: number | null;
        description: string;
    };
}

const ExchangeCard = ({ exchange }: ExchangeCardProps) => {
    const t = useTranslations('Exchanges');
    const visitUrl = exchange.affiliateUrl || exchange.url;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
        >
            {/* Header with logo and rating */}
            <div className="flex items-start justify-between mb-4">
                <div className="relative w-16 h-16 bg-gray-50 rounded-xl p-3">
                    <Image
                        src={exchange.logo}
                        alt={exchange.name}
                        fill
                        className="object-contain p-2"
                        unoptimized={exchange.logo?.startsWith('/uploads/')}
                    />
                </div>
                {exchange.rating && (
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-yellow-700">
                            {exchange.rating.toFixed(1)}
                        </span>
                    </div>
                )}
            </div>

            {/* Exchange name */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{exchange.name}</h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[3.75rem]">
                {exchange.description}
            </p>

            {/* Features */}
            {exchange.features && exchange.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {exchange.features.slice(0, 3).map((feature, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full"
                        >
                            {feature}
                        </span>
                    ))}
                </div>
            )}

            {/* Info row */}
            <div className="flex items-center gap-4 mb-4 pt-4 border-t border-gray-100">
                {exchange.tradingVolume && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <TrendingUp className="w-3 h-3" />
                        <span>{exchange.tradingVolume}</span>
                    </div>
                )}
                <div className="flex items-center gap-1 text-xs">
                    {exchange.kycRequired ? (
                        <>
                            <ShieldCheck className="w-3 h-3 text-blue-500" />
                            <span className="text-blue-700">{t('kycRequired')}</span>
                        </>
                    ) : (
                        <>
                            <ShieldAlert className="w-3 h-3 text-green-500" />
                            <span className="text-green-700">{t('noKyc')}</span>
                        </>
                    )}
                </div>
            </div>

            {/* CTA Button */}
            <a
                href={visitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
                {t('visitExchange')}
                <ExternalLink className="w-4 h-4" />
            </a>
        </motion.div>
    );
};

export default ExchangeCard;
