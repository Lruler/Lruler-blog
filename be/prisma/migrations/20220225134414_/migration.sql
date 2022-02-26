/*
  Warnings:

  - You are about to drop the column `articlesId` on the `Tags` table. All the data in the column will be lost.
  - Added the required column `tags` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Tags` DROP FOREIGN KEY `Tags_articlesId_fkey`;

-- AlterTable
ALTER TABLE `Articles` ADD COLUMN `tags` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Tags` DROP COLUMN `articlesId`,
    ADD COLUMN `count` INTEGER NOT NULL;
