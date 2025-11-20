"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Flame } from "lucide-react";

const airdrops = [
    {
        id: 1,
        name: "Solana",
        logo: "/partners/Solana.svg",
        value: "$150",
        status: "Active",
        type: "Featured",
        description: "Participate in the Solana ecosystem airdrop.",
    },
    {
        id: 2,
        name: "Raydium",
        logo: "/partners/raydium.svg",
        value: "$50",
        status: "Active",
        type: "DeFi",
        description: "Trade on Raydium to be eligible.",
    },
    {
        id: 3,
        name: "Pumpfun",
        logo: "/partners/pumpfun.svg",
        value: "Unknown",
        status: "Upcoming",
        type: "Meme",
        description: "Join the Pumpfun community early.",
    },
    {
        id: 4,
        name: "Coinbase",
        logo: "/partners/coinbase.svg",
        value: "$20",
        status: "Active",
        type: "Exchange",
        description: "Learn and earn with Coinbase.",
    },
    {
        id: 5,
        name: "Polygon",
        logo: "/partners/Polygon.svg",
        value: "$10",
        status: "Ended",
        type: "Layer 2",
        description: "Polygon zkEVM saga.",
    },
    {
        id: 6,
        name: "Sei",
        logo: "/partners/Sei.svg",
        value: "$500",
        status: "Active",
        type: "Layer 1",
        description: "Sei Network atlantic rewards.",
    },
];

const AirdropCard = ({ airdrop }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="relative w-12 h-12 bg-gray-50 rounded-full p-2">
                    <Image
                        src={airdrop.logo}
                        alt={airdrop.name}
                        fill
                        className="object-contain p-2"
                    />
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${airdrop.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : airdrop.status === "Upcoming"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {airdrop.status}
                </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">{airdrop.name}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{airdrop.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Value</span>
                    <span className="text-sm font-medium text-gray-900">{airdrop.value}</span>
                </div>
                <Link
                    href={`/airdrop/${airdrop.id}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                >
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
};

export function AirdropList() {
    return (
        <section id="airdrops" className="py-16 bg-gray-50/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                            Featured Airdrops
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Handpicked for their value and potential, don’t miss out on these quality airdrops.
                        </p>
                    </div>
                    <Link
                        href="/airdrops"
                        className="hidden md:inline-flex items-center text-primary font-medium hover:text-primary-700 transition-colors mt-4 md:mt-0"
                    >
                        View All Airdrops <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {airdrops.map((airdrop, index) => (
                        <motion.div
                            key={airdrop.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <AirdropCard airdrop={airdrop} />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 text-center md:hidden">
                    <Link
                        href="/airdrops"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        View All Airdrops
                    </Link>
                </div>
            </div>
        </section>
    );
}
