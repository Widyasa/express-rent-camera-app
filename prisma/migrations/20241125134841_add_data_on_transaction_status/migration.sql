-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('paid', 'on_going', 'canceled', 'finished', 'pending') NOT NULL DEFAULT 'pending';
