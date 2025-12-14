const fs = require('fs');
const path = require('path');

const partners = [
    "raydium.svg", "pumpfun.svg", "tgmetrics.svg", "solana-foundation.svg",
    "coinbase.svg", "x402.svg", "omniminds.svg", "eliza-os.svg",
    "compute.svg", "tip.md.svg", "MCPay.svg", "OOBE.svg",
    "Solana.svg", "Polygon.svg", "Sei.svg", "base.svg",
    "avax.svg", "IoTex.svg"
];

const targetDir = path.join(__dirname, '../public/partners');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

partners.forEach(filename => {
    const name = filename.replace('.svg', '');
    const svgContent = `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#eee" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="#333">${name}</text>
</svg>`;
    fs.writeFileSync(path.join(targetDir, filename), svgContent);
    console.log(`Created ${filename}`);
});
