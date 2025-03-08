/*
  Warnings:

  - You are about to drop the `Habit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color` to the `HabitGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Habit` DROP FOREIGN KEY `Habit_habitGroupId_fkey`;

-- AlterTable
ALTER TABLE `HabitGroup` ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `isDeleted` BOOLEAN NULL DEFAULT false;

-- DropTable
DROP TABLE `Habit`;

-- DropTable
DROP TABLE `Post`;

-- CreateTable
CREATE TABLE `HabitItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `sort` INTEGER NULL,
    `habitGroupId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HabitItem` ADD CONSTRAINT `HabitItem_habitGroupId_fkey` FOREIGN KEY (`habitGroupId`) REFERENCES `HabitGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
