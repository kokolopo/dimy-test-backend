/*
  Warnings:

  - Added the required column `address` to the `Customer_address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer_address` ADD COLUMN `address` VARCHAR(191) NOT NULL;
