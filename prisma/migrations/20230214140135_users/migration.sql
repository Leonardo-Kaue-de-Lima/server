-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `Nome` VARCHAR(191) NOT NULL,
    `CPF` BIGINT NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Telefone` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
