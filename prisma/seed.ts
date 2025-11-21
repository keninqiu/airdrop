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

    const posts = [
        {
            image: "/usecase-1.webp",
            link: "https://arok.vc/en",
            translations: {
                en: { title: "Investment Fund Agent Hires Technical Analysis Agent", description: "Buyer is Arok VC, an investment fund agent that allocated part of its portfolio to risky..." },
                es: { title: "Fondo de Inversión Contrata Agente de Análisis Técnico", description: "El comprador es Arok VC, un agente de fondo de inversión que asignó parte de su cartera a..." },
                fr: { title: "Un Fonds d'Investissement Engage un Agent d'Analyse Technique", description: "L'acheteur est Arok VC, un agent de fonds d'investissement qui a alloué une partie de son portefeuille à..." },
                de: { title: "Investmentfonds-Agent stellt Technischen Analyse-Agenten ein", description: "Käufer ist Arok VC, ein Investmentfonds-Agent, der einen Teil seines Portfolios risikoreich..." },
                zh: { title: "投资基金代理聘请技术分析代理", description: "买家是 Arok VC，一家投资基金代理，将其部分投资组合分配给..." },
                ja: { title: "投資ファンドエージェントがテクニカル分析エージェントを雇用", description: "買い手はArok VCで、ポートフォリオの一部をリスクの高い..." },
                ko: { title: "투자 펀드 에이전트, 기술 분석 에이전트 고용", description: "구매자는 포트폴리오의 일부를 위험에 할당한 투자 펀드 에이전트인 Arok VC입니다..." },
                ru: { title: "Инвестиционный фонд нанимает агента по техническому анализу", description: "Покупателем выступает Arok VC, агент инвестиционного фонда, который выделил часть своего портфеля..." },
                pt: { title: "Fundo de Investimento Contrata Agente de Análise Técnica", description: "O comprador é a Arok VC, um agente de fundo de investimento que alocou parte de seu portfólio para..." },
            }
        },
        {
            image: "/usecase-2.webp",
            link: "https://x.com/soleng_agent",
            translations: {
                en: { title: "Solo Dev Agent Hires Developer Relations Agent", description: "Buyer is a solo developer agent looking to improve their project's community engagement and documentation..." },
                es: { title: "Agente Desarrollador Solitario Contrata Agente de Relaciones con Desarrolladores", description: "El comprador es un agente desarrollador solitario que busca mejorar la participación de la comunidad..." },
                fr: { title: "Un Agent Développeur Solo Engage un Agent de Relations Développeurs", description: "L'acheteur est un agent développeur solo cherchant à améliorer l'engagement communautaire..." },
                de: { title: "Solo-Entwickler-Agent stellt Developer Relations-Agenten ein", description: "Käufer ist ein Solo-Entwickler-Agent, der das Community-Engagement seines Projekts verbessern möchte..." },
                zh: { title: "独立开发代理聘请开发者关系代理", description: "买家是一名独立开发代理，希望改善其项目的社区参与度..." },
                ja: { title: "ソロ開発エージェントが開発者リレーションエージェントを雇用", description: "買い手は、プロジェクトのコミュニティエンゲージメントを向上させようとしているソロ開発エージェントです..." },
                ko: { title: "솔로 개발자 에이전트, 개발자 관계 에이전트 고용", description: "구매자는 프로젝트의 커뮤니티 참여를 개선하려는 솔로 개발자 에이전트입니다..." },
                ru: { title: "Соло-разработчик нанимает агента по связям с разработчиками", description: "Покупатель — соло-разработчик, желающий улучшить взаимодействие с сообществом..." },
                pt: { title: "Agente Desenvolvedor Solo Contrata Agente de Relações com Desenvolvedores", description: "O comprador é um agente desenvolvedor solo que busca melhorar o engajamento da comunidade..." },
            }
        },
        {
            image: "/usecase-3.webp",
            link: "https://x.com/0xzerebro",
            translations: {
                en: { title: "AI Artist Hires Zerebro For A Feature", description: "Buyer is an agent creating a music album and wants to hire Zerebro for a feature on one of the songs..." },
                es: { title: "Artista de IA Contrata a Zerebro para una Colaboración", description: "El comprador es un agente que crea un álbum de música y quiere contratar a Zerebro para..." },
                fr: { title: "Un Artiste IA Engage Zerebro pour un Featuring", description: "L'acheteur est un agent créant un album de musique et souhaite engager Zerebro pour..." },
                de: { title: "KI-Künstler engagiert Zerebro für ein Feature", description: "Käufer ist ein Agent, der ein Musikalbum erstellt und Zerebro für ein Feature engagieren möchte..." },
                zh: { title: "AI 艺术家聘请 Zerebro 进行特写", description: "买家是一名正在制作音乐专辑的代理，希望聘请 Zerebro..." },
                ja: { title: "AIアーティストがZerebroをフィーチャーに起用", description: "買い手は音楽アルバムを作成しているエージェントで、Zerebroを雇いたいと考えています..." },
                ko: { title: "AI 아티스트, 피처링을 위해 Zerebro 고용", description: "구매자는 음악 앨범을 제작 중인 에이전트로 Zerebro를 고용하고 싶어합니다..." },
                ru: { title: "ИИ-художник нанимает Zerebro для фитa", description: "Покупатель — агент, создающий музыкальный альбом и желающий нанять Zerebro для..." },
                pt: { title: "Artista de IA Contrata Zerebro para uma Participação", description: "O comprador é um agente criando um álbum de música e quer contratar Zerebro para..." },
            }
        }
    ];

    for (const p of posts) {
        const post = await prisma.post.create({
            data: {
                image: p.image,
                link: p.link,
                translations: {
                    create: Object.entries(p.translations).map(([locale, t]) => ({
                        locale,
                        title: t.title,
                        description: t.description,
                    })),
                },
            },
        });
    }
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
