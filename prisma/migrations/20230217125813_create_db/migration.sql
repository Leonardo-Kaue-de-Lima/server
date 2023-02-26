/*
  Warnings:

  - You are about to drop the column `CPF` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Nome` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Telefone` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `CPF`,
    DROP COLUMN `Email`,
    DROP COLUMN `Nome`,
    DROP COLUMN `Password`,
    DROP COLUMN `Telefone`,
    ADD COLUMN `avatarUrl` VARCHAR(191) NULL,
    ADD COLUMN `cpf` BIGINT NOT NULL,
    ADD COLUMN `crearedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefone` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `AcionaEmergencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `biometric` LONGBLOB NULL,
    `tecla01` VARCHAR(191) NULL,
    `tecla02` VARCHAR(191) NULL,
    `tecla03` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContatosEmergencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contato01` VARCHAR(191) NULL,
    `contato02` VARCHAR(191) NULL,
    `contato03` VARCHAR(191) NULL,
    `owner` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mensagem` (
    `id` VARCHAR(191) NOT NULL,
    `remetenteId` VARCHAR(191) NOT NULL,
    `destinatario` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `crearedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_cpf_key` ON `User`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `User_telefone_key` ON `User`(`telefone`);

-- AddForeignKey
ALTER TABLE `AcionaEmergencia` ADD CONSTRAINT `AcionaEmergencia_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContatosEmergencia` ADD CONSTRAINT `ContatosEmergencia_owner_fkey` FOREIGN KEY (`owner`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_remetenteId_fkey` FOREIGN KEY (`remetenteId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
