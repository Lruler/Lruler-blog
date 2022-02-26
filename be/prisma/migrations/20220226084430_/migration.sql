/*
  Warnings:

  - Made the column `articlesId` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Tag` DROP FOREIGN KEY `Tag_articlesId_fkey`;

-- AlterTable
ALTER TABLE `Tag` MODIFY `articlesId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_articlesId_fkey` FOREIGN KEY (`articlesId`) REFERENCES `Articles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
