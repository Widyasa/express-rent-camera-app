/*
  Warnings:

  - You are about to drop the column `typeId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `product_types` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `product_brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_typeId_fkey`;

-- AlterTable
ALTER TABLE `product_brands` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `product_categories` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `typeId`;

-- DropTable
DROP TABLE `product_types`;
