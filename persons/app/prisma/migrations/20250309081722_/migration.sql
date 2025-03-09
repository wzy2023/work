-- CreateTable
CREATE TABLE `HabitGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,
    `sort` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HabitItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `sort` INTEGER NULL,
    `groupId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HabitItem` ADD CONSTRAINT `HabitItem_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `HabitGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
