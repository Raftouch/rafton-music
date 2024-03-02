/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_ArtistSongs` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `audio` on table `Song` required. This step will fail if there are existing NULL values in that column.
  - Made the column `artistId` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'BASIC');

-- DropForeignKey
ALTER TABLE "_ArtistSongs" DROP CONSTRAINT "_ArtistSongs_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistSongs" DROP CONSTRAINT "_ArtistSongs_B_fkey";

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "audio" SET NOT NULL,
ALTER COLUMN "artistId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'BASIC';

-- DropTable
DROP TABLE "_ArtistSongs";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
