import type { Metadata } from "next";
import Script from "next/script";
import "./[locale]/globals.css";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
    title: "Airdrop Platform",
    description: "Discover and participate in crypto airdrops",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-WQXLTRPLJK"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-WQXLTRPLJK');
                    `}
                </Script>
            </head>
            <body suppressHydrationWarning>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
