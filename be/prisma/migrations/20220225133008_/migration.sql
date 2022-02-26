/*
  Warnings:

  - Added the required column `tag` to the `Articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Articles` ADD COLUMN `tag` VARCHAR(191) NOT NULL;
