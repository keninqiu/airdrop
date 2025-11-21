Please ensure you have a .env file in the root of your project (c:\Users\kenin\repositories\airdrop\.env) with a valid DATABASE_URL. Example: DATABASE_URL="mysql://root:password@localhost:3306/airdrop"
Rename or delete prisma.config.ts if you are not using it, as it seems to be interfering with the Prisma CLI.
Run the following command in your terminal to generate the client:
bash
npx prisma generate