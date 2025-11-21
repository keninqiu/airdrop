"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAirdrops, createAirdrop, updateAirdrop, deleteAirdrop } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Airdrop = {
    id: number;
    logo: string;
    value: string;
    status: string;
    type: string;
    translations: Array<{
        id: number;
        locale: string;
        name: string;
        description: string;
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
        translations: LOCALES.map((locale) => ({
            locale,
            name: "",
            description: "",
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
            translations: LOCALES.map((locale) => ({
                locale,
                name: "",
                description: "",
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
            translations: LOCALES.map((locale) => {
                const existing = airdrop.translations.find((t) => t.locale === locale);
                return {
                    locale,
                    name: existing?.name || "",
                    description: existing?.description || "",
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
                                <div>
                                    <label className="block text-sm font-medium mb-1">Logo URL</label>
                                    <input
                                        type="text"
                                        value={formData.logo}
                                        onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="/partners/example.svg"
                                    />
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
                                                    <textarea
                                                        value={translation.description}
                                                        onChange={(e) => {
                                                            const newTranslations = [...formData.translations];
                                                            newTranslations[index].description = e.target.value;
                                                            setFormData({ ...formData, translations: newTranslations });
                                                        }}
                                                        required
                                                        className="w-full px-3 py-2 border rounded-md"
                                                        rows={2}
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
