/*
  Warnings:

  - Added the required column `tags` to the `Articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Articles` ADD COLUMN `tags` VARCHAR(191) NOT NULL;
