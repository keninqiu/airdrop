import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https' as const,
                hostname: 'images.cointelegraph.com',
            },
            {
                protocol: 'https' as const,
                hostname: 'www.coindesk.com',
            },
            {
                protocol: 'https' as const,
                hostname: 'decrypt.co',
            },
            {
                protocol: 'https' as const,
                hostname: 'www.theblockcrypto.com',
            },
            {
                protocol: 'https' as const,
                hostname: 'bitcoinist.com',
            },
            {
                protocol: 'https' as const,
                hostname: 'cryptonews.com',
            },
            {
                protocol: 'https' as const,
                hostname: 'cryptopotato.com',
            },
            {
                protocol: 'https' as const,
                hostname: 'cryptoslate.com',
            },
            {
                protocol: 'https' as const,
                hostname: 'beincrypto.com',
            },
            {
                protocol: 'https' as const,
                hostname: 'u.today',
            },
            {
                protocol: 'https' as const,
                hostname: 'ambcrypto.com',
            },
            {
                protocol: 'https' as const,
                hostname: 'cryptobriefing.com',
            },
            {
                protocol: 'https' as const,
                hostname: 'www.newsbtc.com',
            },
            {
                protocol: 'https' as const,
                hostname: 'blockworks.co',
            },
            {
                protocol: 'https' as const,
                hostname: 'thedefiant.io',
            },
            {
                protocol: 'https' as const,
                hostname: '**', // Allow all HTTPS images (for flexibility)
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: false,
        dirs: ['src'],
    },
    typescript: {
        ignoreBuildErrors: false,
    },
};

export default withNextIntl(nextConfig);
