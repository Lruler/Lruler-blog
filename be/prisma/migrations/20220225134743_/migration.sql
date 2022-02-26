/*
  Warnings:

  - You are about to drop the column `tags` on the `Articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Articles` DROP COLUMN `tags`;

-- AlterTable
ALTER TABLE `Tags` ADD COLUMN `articlesId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_articlesId_fkey` FOREIGN KEY (`articlesId`) REFERENCES `Articles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
