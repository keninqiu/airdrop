"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SubmitAirdropPage() {
    const t = useTranslations('SubmitAirdrop');
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            // router.push("/login?callbackUrl=/submit-airdrop");
        }
    }, [status, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/submit-airdrop");
            return;
        }

        const formData = new FormData(e.target);
        const data = {
            name: formData.get("name"),
            website_url: formData.get("website"),
            description: formData.get("description"),
            value: formData.get("value"),
            campaign_end: formData.get("endDate"),
        };

        try {
            const res = await fetch("/api/user-airdrop", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setMessage("Airdrop submitted successfully! It is now pending approval.");
                e.target.reset();
            } else {
                const errorData = await res.json();
                setMessage(errorData.message || "Submission failed");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

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

                    {status === "unauthenticated" ? (
                        <Card className="bg-white shadow-lg border-0 text-center p-8">
                            <CardHeader>
                                <CardTitle>Sign in to Submit</CardTitle>
                                <CardDescription>
                                    You need to be logged in to submit an airdrop.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="text-white" onClick={() => router.push("/login?callbackUrl=/submit-airdrop")}>
                                    Sign In / Register
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="bg-white shadow-lg border-0">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl">{t('cardTitle')}</CardTitle>
                                <CardDescription>
                                    {t('cardDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="grid gap-6">
                                    <div className="grid gap-2">
                                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            {t('labels.projectName')}
                                        </label>
                                        <Input id="name" name="name" required placeholder={t('placeholders.projectName')} />
                                    </div>

                                    <div className="grid gap-2">
                                        <label htmlFor="website" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            {t('labels.websiteUrl')}
                                        </label>
                                        <Input id="website" name="website" placeholder={t('placeholders.websiteUrl')} />
                                    </div>

                                    <div className="grid gap-2">
                                        <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            {t('labels.description')}
                                        </label>
                                        <Textarea id="description" name="description" required placeholder={t('placeholders.description')} className="min-h-[100px]" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <label htmlFor="value" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {t('labels.estimatedValue')}
                                            </label>
                                            <Input id="value" name="value" placeholder={t('placeholders.estimatedValue')} />
                                        </div>
                                        <div className="grid gap-2">
                                            <label htmlFor="endDate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {t('labels.endDate')}
                                            </label>
                                            <Input id="endDate" name="endDate" type="date" />
                                        </div>
                                    </div>

                                    {message && (
                                        <div className={`text-sm text-center ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
                                            {message}
                                        </div>
                                    )}

                                    <Button type="submit" className="w-full bg-primary hover:bg-primary-700 text-white mt-4" disabled={loading}>
                                        {loading ? "Submitting..." : t('labels.submitButton')}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
