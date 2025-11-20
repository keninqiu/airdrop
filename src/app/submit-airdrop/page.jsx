"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SubmitAirdropPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">List Your Airdrop</h1>
                        <p className="text-lg text-gray-600">
                            Reach millions of crypto enthusiasts and grow your community.
                        </p>
                    </div>

                    <Card className="bg-white shadow-lg border-0">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl">Airdrop Details</CardTitle>
                            <CardDescription>
                                Fill out the form below to submit your airdrop for review.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-2">
                                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Project Name
                                </label>
                                <Input id="name" placeholder="e.g. Solana" />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="website" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Website URL
                                </label>
                                <Input id="website" placeholder="https://..." />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Description
                                </label>
                                <Textarea id="description" placeholder="Describe your airdrop campaign..." className="min-h-[100px]" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <label htmlFor="value" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Estimated Value
                                    </label>
                                    <Input id="value" placeholder="$100" />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="endDate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        End Date
                                    </label>
                                    <Input id="endDate" type="date" />
                                </div>
                            </div>

                            <Button className="w-full bg-primary hover:bg-primary-700 text-white mt-4">
                                Submit Airdrop
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
