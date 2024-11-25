/*
  Warnings:

  - You are about to alter the column `status` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `payment_status` ENUM('half', 'full') NOT NULL DEFAULT 'half',
    MODIFY `status` ENUM('on_going', 'canceled', 'finished', 'pending') NOT NULL DEFAULT 'pending';
