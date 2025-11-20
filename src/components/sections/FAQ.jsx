"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
    const faqs = [
        {
            question: "What is a crypto airdrop?",
            answer:
                "A crypto airdrop is a marketing strategy used by blockchain startups to distribute free tokens to wallet addresses. It's a way to generate awareness and build a community.",
        },
        {
            question: "How do I participate in airdrops?",
            answer:
                "To participate, you usually need a crypto wallet (like MetaMask or Phantom). Each airdrop has specific requirements, such as following social media accounts, joining a Telegram group, or interacting with a protocol.",
        },
        {
            question: "Are airdrops free?",
            answer:
                "Most airdrops are free to join, but some might require you to pay transaction fees (gas fees) if you need to interact with a smart contract. Always do your own research.",
        },
        {
            question: "How do I claim my tokens?",
            answer:
                "After the airdrop campaign ends, the project will usually announce a claim date. You'll need to connect your wallet to their official website to claim your tokens.",
        },
        {
            question: "Is it safe to participate in airdrops?",
            answer:
                "While many airdrops are legitimate, there are also scams. Never share your private keys or seed phrase. Be cautious of projects asking for money to claim an airdrop.",
        },
    ];

    return (
        <section id="faq" className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Got questions? We've got answers.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left text-lg font-medium text-gray-900">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
