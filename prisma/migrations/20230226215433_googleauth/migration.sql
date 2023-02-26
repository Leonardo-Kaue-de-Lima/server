/*
  Warnings:

  - You are about to alter the column `biometric` on the `acionaemergencia` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to drop the column `cpf` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `contato01` on table `contatosemergencia` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_cpf_key` ON `user`;

-- AlterTable
ALTER TABLE `acionaemergencia` MODIFY `biometric` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `contatosemergencia` MODIFY `contato01` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `cpf`,
    ADD COLUMN `googleId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_googleId_key` ON `User`(`googleId`);
