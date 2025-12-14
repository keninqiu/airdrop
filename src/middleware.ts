import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip i18n for login and admin routes
    if (pathname.startsWith("/login") || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
        // Check if accessing admin routes
        if (pathname.startsWith("/admin")) {
            const session = await auth();

            if (!session) {
                return NextResponse.redirect(new URL("/login", request.url));
            }

            // Check if user has ADMIN role
            if (session.user?.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/", request.url));
            }
        }

        return NextResponse.next();
    }

    // Apply i18n middleware for all other routes
    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except static files and Next.js internals
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
