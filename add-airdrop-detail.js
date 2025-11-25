const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, 'messages');
const langs = ['es', 'fr', 'de', 'zh', 'ja', 'ko', 'pt', 'ru'];

const airdropDetail = {
    "howToParticipate": "How to Participate",
    "participateNow": "Participate Now",
    "about": "About this Airdrop",
    "estimatedValue": "Estimated Value"
};

// Chinese translations
const zhAirdropDetail = {
    "howToParticipate": "如何参与",
    "participateNow": "立即参与",
    "about": "关于此空投",
    "estimatedValue": "预估价值"
};

langs.forEach(lang => {
    const filePath = path.join(messagesDir, `${lang}.json`);

    if (fs.existsSync(filePath)) {
        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Add AirdropDetail if it doesn't exist
            if (!data.AirdropDetail) {
                data.AirdropDetail = lang === 'zh' ? zhAirdropDetail : airdropDetail;
                fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + '\n', 'utf8');
                console.log(`✓ Added AirdropDetail to ${lang}.json`);
            } else {
                console.log(`- ${lang}.json already has AirdropDetail`);
            }
        } catch (error) {
            console.error(`✗ Error processing ${lang}.json:`, error.message);
        }
    } else {
        console.log(`- ${lang}.json not found`);
    }
});

console.log('\nDone!');
