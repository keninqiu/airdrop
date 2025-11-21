"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function SubmitAirdropPage() {
    const t = useTranslations('SubmitAirdrop');

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
                        <p className="text-lg text-gray-600">
                            {t('subtitle')}
                        </p>
                    </div>

                    <Card className="bg-white shadow-lg border-0">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl">{t('cardTitle')}</CardTitle>
                            <CardDescription>
                                {t('cardDescription')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-2">
                                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {t('labels.projectName')}
                                </label>
                                <Input id="name" placeholder={t('placeholders.projectName')} />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="website" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {t('labels.websiteUrl')}
                                </label>
                                <Input id="website" placeholder={t('placeholders.websiteUrl')} />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {t('labels.description')}
                                </label>
                                <Textarea id="description" placeholder={t('placeholders.description')} className="min-h-[100px]" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <label htmlFor="value" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {t('labels.estimatedValue')}
                                    </label>
                                    <Input id="value" placeholder={t('placeholders.estimatedValue')} />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="endDate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {t('labels.endDate')}
                                    </label>
                                    <Input id="endDate" type="date" />
                                </div>
                            </div>

                            <Button className="w-full bg-primary hover:bg-primary-700 text-white mt-4">
                                {t('labels.submitButton')}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
