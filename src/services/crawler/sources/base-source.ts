export interface RawAirdropData {
    title: string;
    description?: string;
    url?: string;
    imageUrl?: string;
    blockchain?: string[];
    requirements?: string[];
    startDate?: Date;
    endDate?: Date;
    reward?: string;
    source: string;
    externalId?: string;
}

export interface NormalizedAirdropData {
    logo: string;
    value: string;
    status: string;
    type: string;
    website_url?: string;
    campaign_url?: string;
    whitepaper_url?: string;
    reward_model?: string;
    reward_amount?: string;
    campaign_start?: string;
    campaign_end?: string;
    campaign_requirement?: string;
    blockchain?: string;
    source: string;
    external_id?: string;
    approved: boolean;
    translations: Array<{
        locale: string;
        name: string;
        description: string;
    }>;
}

export abstract class BaseSource {
    protected name: string;
    protected logger: any;

    constructor(name: string) {
        this.name = name;
        this.logger = require('../utils/logger').createLogger(name);
    }

    abstract fetch(): Promise<RawAirdropData[]>;

    protected async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    protected extractBlockchain(text: string): string[] {
        const blockchains = ['Ethereum', 'Solana', 'BSC', 'Polygon', 'Arbitrum', 'Optimism', 'Avalanche', 'Fantom', 'Cosmos', 'Polkadot'];
        const found: string[] = [];

        for (const chain of blockchains) {
            if (text.toLowerCase().includes(chain.toLowerCase())) {
                found.push(chain);
            }
        }

        return found;
    }
}
