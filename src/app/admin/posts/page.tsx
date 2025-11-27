"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getPosts, createPost, updatePost, deletePost } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

type Post = {
    id: number;
    image: string;
    link: string;
    published: boolean;
    translations: Array<{
        id: number;
        locale: string;
        title: string;
        description: string;
    }>;
};

const LOCALES = ["en", "es", "fr", "de", "zh", "ja", "ko", "ru", "pt"];

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [translating, setTranslating] = useState(false);
    const [formData, setFormData] = useState({
        image: "",
        link: "",
        published: true,
        translations: LOCALES.map((locale) => ({
            locale,
            title: "",
            description: "",
        })),
    });

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const data = await getPosts();
            setPosts(data as Post[]);
        } catch (error) {
            console.error("Failed to load posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingPost) {
                await updatePost(editingPost.id, formData);
            } else {
                await createPost(formData);
            }
            setShowForm(false);
            setEditingPost(null);
            resetForm();
            loadPosts();
        } catch (error) {
            console.error("Failed to save post:", error);
            alert("Failed to save post");
        }
    };

    const resetForm = () => {
        setFormData({
            image: "",
            link: "",
            published: true,
            translations: LOCALES.map((locale) => ({
                locale,
                title: "",
                description: "",
            })),
        });
    };

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setFormData({
            image: post.image,
            link: post.link,
            published: post.published,
            translations: LOCALES.map((locale) => {
                const existing = post.translations.find((t) => t.locale === locale);
                return {
                    locale,
                    title: existing?.title || "",
                    description: existing?.description || "",
                };
            }),
        });
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            await deletePost(id);
            loadPosts();
        } catch (error) {
            console.error("Failed to delete post:", error);
            alert("Failed to delete post");
        }
    };

    const handleAutoTranslate = async () => {
        const enTranslation = formData.translations.find(t => t.locale === 'en');

        if (!enTranslation?.title || !enTranslation?.description) {
            alert('Please fill in the English (EN) title and description first');
            return;
        }

        // Check if any translations already exist
        const hasExistingTranslations = formData.translations.some(
            t => t.locale !== 'en' && (t.title || t.description)
        );

        if (hasExistingTranslations) {
            if (!confirm('Some translations already exist. Do you want to overwrite them?')) {
                return;
            }
        }

        setTranslating(true);
        try {
            const newTranslations = [...formData.translations];

            // Translate for each non-English locale
            for (let i = 0; i < newTranslations.length; i++) {
                if (newTranslations[i].locale === 'en') continue;

                const targetLocale = newTranslations[i].locale;

                // Translate in batch (title and description together)
                const response = await fetch('/api/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        texts: [enTranslation.title, enTranslation.description],
                        targetLocale,
                        sourceLocale: 'en',
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Translation failed for ${targetLocale}`);
                }

                const data = await response.json();
                const [translatedTitle, translatedDescription] = data.translations;

                newTranslations[i].title = translatedTitle;
                newTranslations[i].description = translatedDescription;
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">Posts</h2>
                <Button
                    onClick={() => {
                        setShowForm(true);
                        setEditingPost(null);
                        resetForm();
                    }}
                >
                    Add Post
                </Button>
            </div>

            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingPost ? "Edit Post" : "Add New Post"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Image</label>
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                            placeholder="/usecase-1.webp or https://example.com/image.jpg"
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
                                                                setFormData((prev) => ({ ...prev, image: data.url }));
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
                                        {formData.image && (
                                            <div className="relative w-full h-32 border rounded p-1">
                                                <Image
                                                    src={formData.image}
                                                    alt="Image preview"
                                                    fill
                                                    className="object-cover rounded"
                                                    unoptimized={formData.image.startsWith('/uploads/')}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Link</label>
                                    <input
                                        type="url"
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.published}
                                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm font-medium">Published (visible to public)</span>
                                    </label>
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
                                            <div className="space-y-2">
                                                <div>
                                                    <label className="block text-sm mb-1">Title</label>
                                                    <input
                                                        type="text"
                                                        value={translation.title}
                                                        onChange={(e) => {
                                                            const newTranslations = [...formData.translations];
                                                            newTranslations[index].title = e.target.value;
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
                                        setEditingPost(null);
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
                {posts.map((post) => (
                    <Card key={post.id}>
                        <CardContent className="p-4">
                            <div className="relative w-full h-40 mb-3">
                                <Image
                                    src={post.image}
                                    alt={post.translations.find((t) => t.locale === "en")?.title || "Post image"}
                                    fill
                                    className="object-cover rounded"
                                    unoptimized={post.image.startsWith('/uploads/')}
                                />
                            </div>
                            <h3 className="font-semibold mb-1">
                                {post.translations.find((t) => t.locale === "en")?.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                {post.translations.find((t) => t.locale === "en")?.description}
                            </p>
                            <a
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline block mb-3"
                            >
                                {post.link}
                            </a>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        const title = post.translations.find((t) => t.locale === "en")?.title || "Blog Post";
                                        const url = `${window.location.origin}/blog/${post.id}`;
                                        const text = `${title}`;
                                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                                    }}
                                >
                                    Post to X
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)}>
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
