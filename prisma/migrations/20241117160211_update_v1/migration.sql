/*
  Warnings:

  - Added the required column `payAmount` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `staffs` MODIFY `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `payAmount` DOUBLE NOT NULL,
    ADD COLUMN `payment_proof` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('half', 'full') NOT NULL DEFAULT 'half';
