/*
  Warnings:

  - Made the column `count` on table `Tags` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Tags` MODIFY `count` INTEGER NOT NULL;
