import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const airdrops = [
    {
        logo: "/partners/Solana.svg",
        value: "$150",
        status: "Active",
        type: "Featured",
        translations: {
            en: { name: "Solana", description: "Participate in the Solana ecosystem airdrop." },
            es: { name: "Solana", description: "Participa en el airdrop del ecosistema Solana." },
            fr: { name: "Solana", description: "Participez à l'airdrop de l'écosystème Solana." },
            de: { name: "Solana", description: "Nehmen Sie am Solana-Ökosystem-Airdrop teil." },
            zh: { name: "Solana", description: "参与 Solana 生态系统空投。" },
            ja: { name: "Solana", description: "Solanaエコシステムのエアドロップに参加しましょう。" },
            ko: { name: "Solana", description: "Solana 생태계 에어드랍에 참여하세요." },
            ru: { name: "Solana", description: "Участвуйте в аирдропе экосистемы Solana." },
            pt: { name: "Solana", description: "Participe do airdrop do ecossistema Solana." },
        },
    },
    {
        logo: "/partners/raydium.svg",
        value: "$50",
        status: "Active",
        type: "DeFi",
        translations: {
            en: { name: "Raydium", description: "Trade on Raydium to be eligible." },
            es: { name: "Raydium", description: "Opera en Raydium para ser elegible." },
            fr: { name: "Raydium", description: "Échangez sur Raydium pour être éligible." },
            de: { name: "Raydium", description: "Handeln Sie auf Raydium, um berechtigt zu sein." },
            zh: { name: "Raydium", description: "在 Raydium 上交易以获得资格。" },
            ja: { name: "Raydium", description: "Raydiumで取引して資格を得ましょう。" },
            ko: { name: "Raydium", description: "Raydium에서 거래하여 자격을 얻으세요." },
            ru: { name: "Raydium", description: "Торгуйте на Raydium, чтобы получить право." },
            pt: { name: "Raydium", description: "Negocie na Raydium para ser elegível." },
        },
    },
    {
        logo: "/partners/pumpfun.svg",
        value: "Unknown",
        status: "Upcoming",
        type: "Meme",
        translations: {
            en: { name: "Pumpfun", description: "Join the Pumpfun community early." },
            es: { name: "Pumpfun", description: "Únete temprano a la comunidad Pumpfun." },
            fr: { name: "Pumpfun", description: "Rejoignez la communauté Pumpfun tôt." },
            de: { name: "Pumpfun", description: "Treten Sie der Pumpfun-Community frühzeitig bei." },
            zh: { name: "Pumpfun", description: "尽早加入 Pumpfun 社区。" },
            ja: { name: "Pumpfun", description: "Pumpfunコミュニティに早期に参加しましょう。" },
            ko: { name: "Pumpfun", description: "Pumpfun 커뮤니티에 일찍 가입하세요." },
            ru: { name: "Pumpfun", description: "Присоединяйтесь к сообществу Pumpfun заранее." },
            pt: { name: "Pumpfun", description: "Junte-se à comunidade Pumpfun cedo." },
        },
    },
    {
        logo: "/partners/coinbase.svg",
        value: "$20",
        status: "Active",
        type: "Exchange",
        translations: {
            en: { name: "Coinbase", description: "Learn and earn with Coinbase." },
            es: { name: "Coinbase", description: "Aprende y gana con Coinbase." },
            fr: { name: "Coinbase", description: "Apprenez et gagnez avec Coinbase." },
            de: { name: "Coinbase", description: "Lernen und verdienen Sie mit Coinbase." },
            zh: { name: "Coinbase", description: "通过 Coinbase 学习并赚取。" },
            ja: { name: "Coinbase", description: "Coinbaseで学び、稼ぎましょう。" },
            ko: { name: "Coinbase", description: "Coinbase와 함께 배우고 수익을 올리세요." },
            ru: { name: "Coinbase", description: "Учитесь и зарабатывайте с Coinbase." },
            pt: { name: "Coinbase", description: "Aprenda e ganhe com a Coinbase." },
        },
    },
    {
        logo: "/partners/Polygon.svg",
        value: "$10",
        status: "Ended",
        type: "Layer 2",
        translations: {
            en: { name: "Polygon", description: "Polygon zkEVM saga." },
            es: { name: "Polygon", description: "Saga Polygon zkEVM." },
            fr: { name: "Polygon", description: "Saga Polygon zkEVM." },
            de: { name: "Polygon", description: "Polygon zkEVM Saga." },
            zh: { name: "Polygon", description: "Polygon zkEVM 传奇。" },
            ja: { name: "Polygon", description: "Polygon zkEVMサーガ。" },
            ko: { name: "Polygon", description: "Polygon zkEVM 사가." },
            ru: { name: "Polygon", description: "Сага Polygon zkEVM." },
            pt: { name: "Polygon", description: "Saga Polygon zkEVM." },
        },
    },
    {
        logo: "/partners/Sei.svg",
        value: "$500",
        status: "Active",
        type: "Layer 1",
        translations: {
            en: { name: "Sei", description: "Sei Network atlantic rewards." },
            es: { name: "Sei", description: "Recompensas atlánticas de Sei Network." },
            fr: { name: "Sei", description: "Récompenses atlantiques du réseau Sei." },
            de: { name: "Sei", description: "Sei Network Atlantic Belohnungen." },
            zh: { name: "Sei", description: "Sei Network 大西洋奖励。" },
            ja: { name: "Sei", description: "Sei Networkアトランティック報酬。" },
            ko: { name: "Sei", description: "Sei Network 대서양 보상." },
            ru: { name: "Sei", description: "Атлантические награды Sei Network." },
            pt: { name: "Sei", description: "Recompensas atlânticas da Sei Network." },
        },
    },
];

async function main() {
    console.log('Start seeding ...');
    for (const a of airdrops) {
        const airdrop = await prisma.airdrop.create({
            data: {
                logo: a.logo,
                value: a.value,
                status: a.status,
                type: a.type,
                translations: {
                    create: Object.entries(a.translations).map(([locale, t]) => ({
                        locale,
                        name: t.name,
                        description: t.description,
                    })),
                },
            },
        });
        console.log(`Created airdrop with id: ${airdrop.id}`);
    }
    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
