import type { Metadata } from "next";
import "./[locale]/globals.css";

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
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
