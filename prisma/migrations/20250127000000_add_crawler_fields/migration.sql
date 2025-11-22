-- AlterTable
ALTER TABLE `Airdrop` 
    ADD COLUMN `source` VARCHAR(191) NULL COMMENT 'Where the airdrop was found',
    ADD COLUMN `external_id` VARCHAR(191) NULL UNIQUE COMMENT 'ID from source system',
    ADD COLUMN `approved` BOOLEAN NOT NULL DEFAULT false COMMENT 'Admin approval status',
    ADD COLUMN `crawled_at` DATETIME(3) NULL COMMENT 'When it was crawled';
