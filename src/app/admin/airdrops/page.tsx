"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAirdrops, createAirdrop, updateAirdrop, deleteAirdrop } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

type Airdrop = {
    id: number;
    logo: string;
    value: string;
    status: string;
    type: string;
    website_url?: string | null;
    campaign_url?: string | null;
    whitepaper_url?: string | null;
    reward_model?: string | null;
    reward_amount?: string | null;
    campaign_start?: Date | null;
    campaign_end?: Date | null;
    campaign_requirement?: string | null;
    blockchain?: string | null;
    translations: Array<{
        id: number;
        locale: string;
        name: string;
        description: string;
        steps?: string | null;
    }>;
};

const LOCALES = ["en", "es", "fr", "de", "zh", "ja", "ko", "ru", "pt"];

export default function AirdropsPage() {
    const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingAirdrop, setEditingAirdrop] = useState<Airdrop | null>(null);
    const [formData, setFormData] = useState({
        logo: "",
        value: "",
        status: "Active",
        type: "Featured",
        website_url: "",
        campaign_url: "",
        whitepaper_url: "",
        reward_model: "",
        reward_amount: "",
        campaign_start: "",
        campaign_end: "",
        campaign_requirement: "",
        blockchain: "",
        translations: LOCALES.map((locale) => ({
            locale,
            name: "",
            description: "",
            steps: "",
        })),
    });

    useEffect(() => {
        loadAirdrops();
    }, []);

    const loadAirdrops = async () => {
        try {
            const data = await getAirdrops();
            setAirdrops(data as Airdrop[]);
        } catch (error) {
            console.error("Failed to load airdrops:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingAirdrop) {
                await updateAirdrop(editingAirdrop.id, formData);
            } else {
                await createAirdrop(formData);
            }
            setShowForm(false);
            setEditingAirdrop(null);
            resetForm();
            loadAirdrops();
        } catch (error) {
            console.error("Failed to save airdrop:", error);
            alert("Failed to save airdrop");
        }
    };

    const resetForm = () => {
        setFormData({
            logo: "",
            value: "",
            status: "Active",
            type: "Featured",
            website_url: "",
            campaign_url: "",
            whitepaper_url: "",
            reward_model: "",
            reward_amount: "",
            campaign_start: "",
            campaign_end: "",
            campaign_requirement: "",
            blockchain: "",
            translations: LOCALES.map((locale) => ({
                locale,
                name: "",
                description: "",
                steps: "",
            })),
        });
    };

    const handleEdit = (airdrop: Airdrop) => {
        setEditingAirdrop(airdrop);
        setFormData({
            logo: airdrop.logo,
            value: airdrop.value,
            status: airdrop.status,
            type: airdrop.type,
            website_url: airdrop.website_url || "",
            campaign_url: airdrop.campaign_url || "",
            whitepaper_url: airdrop.whitepaper_url || "",
            reward_model: airdrop.reward_model || "",
            reward_amount: airdrop.reward_amount || "",
            campaign_start: airdrop.campaign_start ? new Date(airdrop.campaign_start).toISOString().slice(0, 16) : "",
            campaign_end: airdrop.campaign_end ? new Date(airdrop.campaign_end).toISOString().slice(0, 16) : "",
            campaign_requirement: airdrop.campaign_requirement || "",
            blockchain: airdrop.blockchain || "",
            translations: LOCALES.map((locale) => {
                const existing = airdrop.translations.find((t) => t.locale === locale);
                return {
                    locale,
                    name: existing?.name || "",
                    description: existing?.description || "",
                    steps: existing?.steps || "",
                };
            }),
        });
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this airdrop?")) return;

        try {
            await deleteAirdrop(id);
            loadAirdrops();
        } catch (error) {
            console.error("Failed to delete airdrop:", error);
            alert("Failed to delete airdrop");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">Airdrops</h2>
                <Button
                    onClick={() => {
                        setShowForm(true);
                        setEditingAirdrop(null);
                        resetForm();
                    }}
                >
                    Add Airdrop
                </Button>
            </div>

            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingAirdrop ? "Edit Airdrop" : "Add New Airdrop"}</CardTitle>
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
                                            placeholder="/partners/example.svg or https://example.com/logo.png"
                                        />
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        try {
                                                            const formData = new FormData();
                                                            formData.append("file", file);

                                                            const response = await fetch("/api/upload", {
                                                                method: "POST",
                                                                body: formData,
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
                                    <label className="block text-sm font-medium mb-1">Value</label>
                                    <input
                                        type="text"
                                        value={formData.value}
                                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="$100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Ended">Ended</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md"
                                    >
                                        <option value="Featured">Featured</option>
                                        <option value="DeFi">DeFi</option>
                                        <option value="Meme">Meme</option>
                                        <option value="Exchange">Exchange</option>
                                        <option value="Layer 2">Layer 2</option>
                                        <option value="Layer 1">Layer 1</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Website URL</label>
                                    <input
                                        type="url"
                                        value={formData.website_url}
                                        onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Campaign URL</label>
                                    <input
                                        type="url"
                                        value={formData.campaign_url}
                                        onChange={(e) => setFormData({ ...formData, campaign_url: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="https://campaign.example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Whitepaper URL</label>
                                    <input
                                        type="url"
                                        value={formData.whitepaper_url}
                                        onChange={(e) => setFormData({ ...formData, whitepaper_url: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="https://whitepaper.example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Reward Model</label>
                                    <select
                                        value={formData.reward_model}
                                        onChange={(e) => setFormData({ ...formData, reward_model: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md"
                                    >
                                        <option value="">Select reward model</option>
                                        <option value="per_wallet">Per Wallet (Fixed reward per eligible wallet)</option>
                                        <option value="reward_pool">Reward Pool (Total amount split among participants)</option>
                                        <option value="hybrid">Hybrid (Both per wallet and reward pool)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Reward Amount</label>
                                    <input
                                        type="text"
                                        value={formData.reward_amount}
                                        onChange={(e) => setFormData({ ...formData, reward_amount: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="e.g., 100 USDT, 0.5 ETH, $1000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Campaign Start Date</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.campaign_start}
                                        onChange={(e) => setFormData({ ...formData, campaign_start: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Campaign End Date</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.campaign_end}
                                        onChange={(e) => setFormData({ ...formData, campaign_end: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-1">Campaign Requirements</label>
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {["Trade", "KYC", "Deposit", "X (Twitter)", "Discord", "Telegram", "Hold Tokens", "Referral", "Other"].map((req) => (
                                                <label key={req} className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.campaign_requirement?.split(",").map(r => r.trim()).includes(req) || false}
                                                        onChange={(e) => {
                                                            const current = formData.campaign_requirement ? formData.campaign_requirement.split(",").map(r => r.trim()) : [];
                                                            if (e.target.checked) {
                                                                setFormData({ ...formData, campaign_requirement: [...current, req].join(", ") });
                                                            } else {
                                                                setFormData({ ...formData, campaign_requirement: current.filter(r => r !== req).join(", ") });
                                                            }
                                                        }}
                                                        className="mr-1"
                                                    />
                                                    <span className="text-sm">{req}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <textarea
                                            value={formData.campaign_requirement}
                                            onChange={(e) => setFormData({ ...formData, campaign_requirement: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md"
                                            rows={2}
                                            placeholder="Or enter custom requirements (comma-separated)"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-1">Blockchain</label>
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {["Ethereum", "Solana", "BSC", "Polygon", "Arbitrum", "Optimism", "Avalanche", "Fantom", "Cosmos", "Polkadot", "Other"].map((chain) => (
                                                <label key={chain} className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.blockchain?.split(",").map(c => c.trim()).includes(chain) || false}
                                                        onChange={(e) => {
                                                            const current = formData.blockchain ? formData.blockchain.split(",").map(c => c.trim()) : [];
                                                            if (e.target.checked) {
                                                                setFormData({ ...formData, blockchain: [...current, chain].join(", ") });
                                                            } else {
                                                                setFormData({ ...formData, blockchain: current.filter(c => c !== chain).join(", ") });
                                                            }
                                                        }}
                                                        className="mr-1"
                                                    />
                                                    <span className="text-sm">{chain}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <textarea
                                            value={formData.blockchain}
                                            onChange={(e) => setFormData({ ...formData, blockchain: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md"
                                            rows={2}
                                            placeholder="Or enter custom blockchains (comma-separated)"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-3">Translations</h3>
                                <div className="space-y-4">
                                    {formData.translations.map((translation, index) => (
                                        <div key={translation.locale} className="border p-4 rounded-md">
                                            <h4 className="font-medium mb-2">{translation.locale.toUpperCase()}</h4>
                                            <div className="space-y-2">
                                                <div>
                                                    <label className="block text-sm mb-1">Name</label>
                                                    <input
                                                        type="text"
                                                        value={translation.name}
                                                        onChange={(e) => {
                                                            const newTranslations = [...formData.translations];
                                                            newTranslations[index].name = e.target.value;
                                                            setFormData({ ...formData, translations: newTranslations });
                                                        }}
                                                        required
                                                        className="w-full px-3 py-2 border rounded-md"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm mb-1">Description</label>
                                                    <RichTextEditor
                                                        value={translation.description}
                                                        onChange={(value) => {
                                                            const newTranslations = [...formData.translations];
                                                            newTranslations[index].description = value;
                                                            setFormData({ ...formData, translations: newTranslations });
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm mb-1">How to Participate (Steps)</label>
                                                    <RichTextEditor
                                                        value={translation.steps || ""}
                                                        onChange={(value) => {
                                                            const newTranslations = [...formData.translations];
                                                            newTranslations[index].steps = value;
                                                            setFormData({ ...formData, translations: newTranslations });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit">Save</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingAirdrop(null);
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
                {airdrops.map((airdrop) => (
                    <Card key={airdrop.id}>
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="relative w-8 h-8">
                                        <Image
                                            src={airdrop.logo}
                                            alt={airdrop.translations.find((t) => t.locale === "en")?.name || "Airdrop logo"}
                                            fill
                                            className="object-contain"
                                            unoptimized={airdrop.logo.startsWith('/uploads/')}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">
                                            {airdrop.translations.find((t) => t.locale === "en")?.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">{airdrop.value}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 mb-3">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                    {airdrop.status}
                                </span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                    {airdrop.type}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(airdrop)}>
                                    Edit
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleDelete(airdrop.id)}>
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
