/*
  Warnings:

  - You are about to drop the column `articlesId` on the `Tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Tags` DROP FOREIGN KEY `Tags_articlesId_fkey`;

-- AlterTable
ALTER TABLE `Tags` DROP COLUMN `articlesId`;
