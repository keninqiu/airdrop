"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AdminNav({ children }: { children?: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/users", label: "Users" },
        { href: "/admin/airdrops", label: "Airdrops" },
        { href: "/admin/submissions", label: "Submissions" },
        { href: "/admin/posts", label: "Posts" },
    ];

    return (
        <>
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                                View Site
                            </Link>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
                    <nav className="p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.href
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </>
    );
}
