npm run crawler:once

ALTER TABLE Post
MODIFY published TINYINT(1) NOT NULL DEFAULT 0;

1. Visit the Gatbits Airdrop page. (Mandatory)
Complete all tasks from the airdrop page and provide your referral link as proof. Make sure to submit your information to the airdrop page!
STEPS:
🔹Start the GTBS Tap Tap Game Bot﻿
🔹Earn points by completing tasks and Tap2Earn
🔹Also, refer friends to earn more points
2. Follow Gatbits on X.
🔹Follow @Gtbschain
3. Join Gatbits group on Telegram.
🔹Follow on Telegram


CREATE TABLE `Exchange` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `affiliateUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `features` text COLLATE utf8mb4_unicode_ci,
  `tradingVolume` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kycRequired` tinyint(1) NOT NULL DEFAULT '0',
  `rating` double DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `published` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ExchangeTranslation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exchangeId` int NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ExchangeTranslation_exchangeId_locale_key` (`exchangeId`,`locale`),
  CONSTRAINT `ExchangeTranslation_exchangeId_fkey` FOREIGN KEY (`exchangeId`) REFERENCES `exchange` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

