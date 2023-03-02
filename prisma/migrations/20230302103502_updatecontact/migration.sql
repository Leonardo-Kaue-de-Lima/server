/*
  Warnings:

  - Added the required column `name` to the `contact_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contact_user` ADD COLUMN `name` VARCHAR(191) NOT NULL;
