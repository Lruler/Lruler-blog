/*
  Warnings:

  - You are about to drop the column `tags` on the `Articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Articles` DROP COLUMN `tags`;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag` VARCHAR(191) NOT NULL,
    `articlesId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_articlesId_fkey` FOREIGN KEY (`articlesId`) REFERENCES `Articles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
