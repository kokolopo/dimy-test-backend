/*
  Warnings:

  - You are about to drop the column `customerName` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the `customeraddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customer_name` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `customeraddress` DROP FOREIGN KEY `CustomerAddress_customer_id_fkey`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `customerName`,
    ADD COLUMN `customer_name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `customeraddress`;

-- CreateTable
CREATE TABLE `Customer_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,

    UNIQUE INDEX `Customer_address_customer_id_key`(`customer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer_address` ADD CONSTRAINT `Customer_address_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
