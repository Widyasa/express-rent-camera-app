/*
  Warnings:

  - You are about to drop the column `brandId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `transaction_items` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `transaction_items` table. All the data in the column will be lost.
  - Added the required column `brand_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `transaction_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `transaction_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction_items` DROP FOREIGN KEY `transaction_items_productId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction_items` DROP FOREIGN KEY `transaction_items_transactionId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `brandId`,
    DROP COLUMN `categoryId`,
    ADD COLUMN `brand_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `category_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaction_items` DROP COLUMN `productId`,
    DROP COLUMN `transactionId`,
    ADD COLUMN `product_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `transaction_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `product_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `product_brands`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_items` ADD CONSTRAINT `transaction_items_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_items` ADD CONSTRAINT `transaction_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
