-- Drop tables if they exist (to recreate with correct schema)
DROP TABLE IF EXISTS `UserAirdropListingTranslation`;
DROP TABLE IF EXISTS `UserAirdropListing`;

-- Create UserAirdropListing table
CREATE TABLE `UserAirdropListing` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `logo` VARCHAR(191) NULL,
  `value` VARCHAR(191) NULL,
  `status` VARCHAR(191) NOT NULL DEFAULT 'Pending',
  `type` VARCHAR(191) NULL,
  `website_url` VARCHAR(191) NULL,
  `campaign_url` VARCHAR(191) NULL,
  `whitepaper_url` VARCHAR(191) NULL,
  `reward_model` ENUM('per_wallet', 'reward_pool', 'hybrid') NULL,
  `reward_amount` VARCHAR(191) NULL,
  `campaign_start` DATETIME(3) NULL,
  `campaign_end` DATETIME(3) NULL,
  `campaign_requirement` TEXT NULL,
  `blockchain` TEXT NULL,
  `rejection_reason` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `UserAirdropListing_userId_idx` (`userId`),
  CONSTRAINT `UserAirdropListing_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create UserAirdropListingTranslation table
CREATE TABLE `UserAirdropListingTranslation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `listingId` INT NOT NULL,
  `locale` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `steps` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UserAirdropListingTranslation_listingId_locale_key` (`listingId`, `locale`),
  CONSTRAINT `UserAirdropListingTranslation_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `UserAirdropListing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
