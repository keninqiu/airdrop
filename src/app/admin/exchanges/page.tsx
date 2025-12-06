"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getExchanges, createExchange, updateExchange, deleteExchange } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Exchange = {
    id: number;
    name: string;
    logo: string;
    url: string;
    affiliateUrl: string | null;
    features: string | null;
    tradingVolume: string | null;
    kycRequired: boolean;
    rating: number | null;
    sortOrder: number;
    published: boolean;
    translations: Array<{
        id: number;
        locale: string;
        description: string;
    }>;
};

const LOCALES = ["en", "es", "fr", "de", "zh", "ja", "ko", "ru", "pt"];

export default function ExchangesPage() {
    const [exchanges, setExchanges] = useState<Exchange[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingExchange, setEditingExchange] = useState<Exchange | null>(null);
    const [translating, setTranslating] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        logo: "",
        url: "",
        affiliateUrl: "",
        features: [] as string[],
        tradingVolume: "",
        kycRequired: false,
        rating: 0,
        sortOrder: 0,
        published: true,
        translations: LOCALES.map((locale) => ({
            locale,
            description: "",
        })),
    });

    useEffect(() => {
        loadExchanges();
    }, []);

    const loadExchanges = async () => {
        try {
            const data = await getExchanges();
            setExchanges(data as Exchange[]);
        } catch (error) {
            console.error("Failed to load exchanges:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingExchange) {
                await updateExchange(editingExchange.id, formData);
            } else {
                await createExchange(formData);
            }
            setShowForm(false);
            setEditingExchange(null);
            resetForm();
            loadExchanges();
        } catch (error) {
            console.error("Failed to save exchange:", error);
            alert("Failed to save exchange");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            logo: "",
            url: "",
            affiliateUrl: "",
            features: [],
            tradingVolume: "",
            kycRequired: false,
            rating: 0,
            sortOrder: 0,
            published: true,
            translations: LOCALES.map((locale) => ({
                locale,
                description: "",
            })),
        });
    };

    const handleEdit = (exchange: Exchange) => {
        setEditingExchange(exchange);
        setFormData({
            name: exchange.name,
            logo: exchange.logo,
            url: exchange.url,
            affiliateUrl: exchange.affiliateUrl || "",
            features: exchange.features ? JSON.parse(exchange.features) : [],
            tradingVolume: exchange.tradingVolume || "",
            kycRequired: exchange.kycRequired,
            rating: exchange.rating || 0,
            sortOrder: exchange.sortOrder,
            published: exchange.published,
            translations: LOCALES.map((locale) => {
                const existing = exchange.translations.find((t) => t.locale === locale);
                return {
                    locale,
                    description: existing?.description || "",
                };
            }),
        });
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this exchange?")) return;

        try {
            await deleteExchange(id);
            loadExchanges();
        } catch (error) {
            console.error("Failed to delete exchange:", error);
            alert("Failed to delete exchange");
        }
    };

    const handleAutoTranslate = async () => {
        const enTranslation = formData.translations.find(t => t.locale === 'en');

        if (!enTranslation?.description) {
            alert('Please fill in the English (EN) description first');
            return;
        }

        const hasExistingTranslations = formData.translations.some(
            t => t.locale !== 'en' && t.description
        );

        if (hasExistingTranslations) {
            if (!confirm('Some translations already exist. Do you want to overwrite them?')) {
                return;
            }
        }

        setTranslating(true);
        try {
            const newTranslations = [...formData.translations];

            for (let i = 0; i < newTranslations.length; i++) {
                if (newTranslations[i].locale === 'en') continue;

                const targetLocale = newTranslations[i].locale;

                const response = await fetch('/api/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        texts: [enTranslation.description],
                        targetLocale,
                        sourceLocale: 'en',
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Translation failed for ${targetLocale}`);
                }

                const data = await response.json();
                newTranslations[i].description = data.translations[0];
            }

            setFormData({ ...formData, translations: newTranslations });
            alert('Translations completed successfully!');
        } catch (error) {
            console.error('Auto-translate error:', error);
            alert(`Translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setTranslating(false);
        }
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const removeFeature = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">Exchanges</h2>
                <Button
                    onClick={() => {
                        setShowForm(true);
                        setEditingExchange(null);
                        resetForm();
                    }}
                    className="text-white"
                >
                    Add Exchange
                </Button>
            </div>

            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingExchange ? "Edit Exchange" : "Add New Exchange"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-1">Logo</label>
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={formData.logo}
                                            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                            placeholder="https://example.com/logo.png"
                                        />
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        try {
                                                            const formDataUpload = new FormData();
                                                            formDataUpload.append("file", file);

                                                            const response = await fetch("/api/upload", {
                                                                method: "POST",
                                                                body: formDataUpload,
                                                            });

                                                            if (response.ok) {
                                                                const data = await response.json();
                                                                setFormData((prev) => ({ ...prev, logo: data.url }));
                                                            } else {
                                                                alert("Failed to upload file");
                                                            }
                                                        } catch (error) {
                                                            console.error("Upload error:", error);
                                                            alert("Failed to upload file");
                                                        }
                                                    }
                                                }}
                                                className="text-sm"
                                            />
                                            <span className="text-xs text-gray-500">Or upload an image (max 5MB)</span>
                                        </div>
                                        {formData.logo && (
                                            <div className="relative w-16 h-16 border rounded p-1">
                                                <Image
                                                    src={formData.logo}
                                                    alt="Logo preview"
                                                    fill
                                                    className="object-contain"
                                                    unoptimized={formData.logo.startsWith('/uploads/')}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="Binance"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                                    <input
                                        type="number"
                                        value={formData.sortOrder}
                                        onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">URL</label>
                                    <input
                                        type="url"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Affiliate URL (Optional)</label>
                                    <input
                                        type="url"
                                        value={formData.affiliateUrl}
                                        onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="https://affiliate.example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Trading Volume</label>
                                    <input
                                        type="text"
                                        value={formData.tradingVolume}
                                        onChange={(e) => setFormData({ ...formData, tradingVolume: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="$76B Daily"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="4.5"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.kycRequired}
                                            onChange={(e) => setFormData({ ...formData, kycRequired: e.target.checked })}
                                            className="rounded"
                                        />
                                        <span className="text-sm font-medium">KYC Required</span>
                                    </label>
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.published}
                                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                            className="rounded"
                                        />
                                        <span className="text-sm font-medium">Published</span>
                                    </label>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-medium">Features</label>
                                        <Button type="button" size="sm" variant="outline" onClick={addFeature}>
                                            Add Feature
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {formData.features.map((feature, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={(e) => updateFeature(index, e.target.value)}
                                                    className="flex-1 px-3 py-2 border rounded-md"
                                                    placeholder="e.g., Spot Trading"
                                                />
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => removeFeature(index)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold">Translations</h3>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAutoTranslate}
                                        disabled={translating}
                                    >
                                        {translating ? 'Translating...' : 'Auto-Translate from EN'}
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {formData.translations.map((translation, index) => (
                                        <div key={translation.locale} className="border p-4 rounded-md">
                                            <h4 className="font-medium mb-2">{translation.locale.toUpperCase()}</h4>
                                            <div>
                                                <label className="block text-sm mb-1">Description</label>
                                                <textarea
                                                    value={translation.description}
                                                    onChange={(e) => {
                                                        const newTranslations = [...formData.translations];
                                                        newTranslations[index].description = e.target.value;
                                                        setFormData({ ...formData, translations: newTranslations });
                                                    }}
                                                    required
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    rows={3}
                                                    placeholder="Exchange description..."
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="text-white">Save</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingExchange(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exchanges.map((exchange) => (
                    <Card key={exchange.id}>
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="relative w-8 h-8">
                                        <Image
                                            src={exchange.logo}
                                            alt={exchange.name}
                                            fill
                                            className="object-contain"
                                            unoptimized={exchange.logo.startsWith('/uploads/')}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{exchange.name}</h3>
                                        {exchange.rating && (
                                            <p className="text-sm text-yellow-600">⭐ {exchange.rating.toFixed(1)}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 mb-3 flex-wrap">
                                {exchange.kycRequired ? (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                        KYC Required
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                        No KYC
                                    </span>
                                )}
                                {!exchange.published && (
                                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                        Unpublished
                                    </span>
                                )}
                                {exchange.tradingVolume && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                        {exchange.tradingVolume}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(exchange)}>
                                    Edit
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleDelete(exchange.id)}>
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
