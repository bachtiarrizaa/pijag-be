/*
  Warnings:

  - Added the required column `source` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_cashier_id_fkey`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `source` ENUM('customer', 'cashier') NOT NULL,
    MODIFY `cashier_id` BIGINT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_cashier_id_fkey` FOREIGN KEY (`cashier_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
