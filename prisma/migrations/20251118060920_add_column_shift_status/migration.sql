/*
  Warnings:

  - Added the required column `status` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Made the column `start_time` on table `shift` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `shift` ADD COLUMN `status` ENUM('OPEN', 'CLOSED') NOT NULL,
    MODIFY `start_time` DATETIME(3) NOT NULL;
