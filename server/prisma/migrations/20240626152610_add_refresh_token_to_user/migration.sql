/*
  Warnings:

  - You are about to drop the `_FavoriteSongs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ListenedSongs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavoriteSongs" DROP CONSTRAINT "_FavoriteSongs_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteSongs" DROP CONSTRAINT "_FavoriteSongs_B_fkey";

-- DropForeignKey
ALTER TABLE "_ListenedSongs" DROP CONSTRAINT "_ListenedSongs_A_fkey";

-- DropForeignKey
ALTER TABLE "_ListenedSongs" DROP CONSTRAINT "_ListenedSongs_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" VARCHAR(255);

-- DropTable
DROP TABLE "_FavoriteSongs";

-- DropTable
DROP TABLE "_ListenedSongs";
