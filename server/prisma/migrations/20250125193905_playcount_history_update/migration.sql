/*
  Warnings:

  - You are about to drop the column `playedAt` on the `SongPlayHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SongPlayHistory" DROP COLUMN "playedAt",
ADD COLUMN     "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;
