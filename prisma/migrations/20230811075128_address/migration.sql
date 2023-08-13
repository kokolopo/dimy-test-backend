/*
  Warnings:

  - You are about to drop the column `customerId` on the `customeraddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customer_id]` on the table `CustomerAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_id` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `customeraddress` DROP FOREIGN KEY `CustomerAddress_customerId_fkey`;

-- AlterTable
ALTER TABLE `customeraddress` DROP COLUMN `customerId`,
    ADD COLUMN `customer_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CustomerAddress_customer_id_key` ON `CustomerAddress`(`customer_id`);

-- AddForeignKey
ALTER TABLE `CustomerAddress` ADD CONSTRAINT `CustomerAddress_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
