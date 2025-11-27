import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPostsWithPagination } from "@/services/blog-service";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from 'next-intl/server';

export default async function BlogsPage({ params, searchParams }) {
    const { locale } = await params;
    const sp = await searchParams;
    const currentPage = parseInt(sp?.page || '1');

    const { posts, totalPages, currentPage: page } = await getPostsWithPagination(locale, currentPage, 9);
    const t = await getTranslations('AllBlogs');

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* Header */}
                    <div className="mb-12">
                        <Link
                            href="/#blog"
                            className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t('backToHome')}
                        </Link>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            {t('heading')}
                        </h1>
                        <p className="text-lg text-gray-600">
                            {t('description')}
                        </p>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8 mb-12">
                        {posts.map((post) => (
                            <Card key={post.id} className="h-full overflow-hidden border border-gray-100 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                                <div className="relative w-full overflow-hidden aspect-[4/3]">
                                    <Link href={`/blog/${post.id}`}>
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover hover:scale-110 transition-transform duration-500"
                                            unoptimized={post.image?.startsWith('/uploads/')}
                                        />
                                    </Link>
                                </div>
                                <CardContent className="px-5 py-5 md:px-6 md:py-6">
                                    <Link href={`/blog/${post.id}`}>
                                        <h3 className="text-midnight text-xl font-medium leading-snug mb-2 hover:text-primary transition-colors cursor-pointer">
                                            {post.title}
                                        </h3>
                                    </Link>
                                    <div
                                        className="text-gray-600 text-sm line-clamp-2"
                                        dangerouslySetInnerHTML={{ __html: post.description }}
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4">
                            <Link
                                href={`/blogs?page=${Math.max(1, currentPage - 1)}`}
                                className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border transition-colors ${currentPage === 1
                                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                    }`}
                                aria-disabled={currentPage === 1}
                            >
                                <ChevronLeft className="w-5 h-5 mr-1" />
                                {t('previous')}
                            </Link>

                            <span className="text-gray-700 text-sm">
                                {t('page', { current: currentPage, total: totalPages })}
                            </span>

                            <Link
                                href={`/blogs?page=${Math.min(totalPages, currentPage + 1)}`}
                                className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border transition-colors ${currentPage === totalPages
                                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                    }`}
                                aria-disabled={currentPage === totalPages}
                            >
                                {t('next')}
                                <ChevronRight className="w-5 h-5 ml-1" />
                            </Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
