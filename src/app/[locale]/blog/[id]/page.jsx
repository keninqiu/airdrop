import React from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPostById } from "@/services/blog-service";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from 'next-intl/server';

export default async function BlogPostPage({ params }) {
    const { id, locale } = await params;
    const post = await getPostById(parseInt(id), locale);
    const t = await getTranslations('BlogDetail');

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.createdAt).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t('backToBlog')}
                    </Link>

                    <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="relative w-full h-64 md:h-96 bg-gray-100">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                unoptimized={post.image?.startsWith('/uploads/')}
                            />
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                <Calendar className="w-4 h-4 mr-2" />
                                {formattedDate}
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                                {post.title}
                            </h1>

                            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                                <div dangerouslySetInnerHTML={{ __html: post.description }} />
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <a
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    {t('readOriginalSource')} <ExternalLink className="w-5 h-5 ml-2" />
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}
