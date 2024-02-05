/*
  Warnings:

  - You are about to drop the column `duration` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `favourited_by_id` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `listened_by_id` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `play_count` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `uploaded_by_id` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `registration_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_ArtistToSong` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GenreToSong` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artistId` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genreId` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_favourited_by_id_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_listened_by_id_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_uploaded_by_id_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToSong" DROP CONSTRAINT "_ArtistToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToSong" DROP CONSTRAINT "_ArtistToSong_B_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToSong" DROP CONSTRAINT "_GenreToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToSong" DROP CONSTRAINT "_GenreToSong_B_fkey";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "duration",
DROP COLUMN "favourited_by_id",
DROP COLUMN "listened_by_id",
DROP COLUMN "play_count",
DROP COLUMN "uploaded_by_id",
ADD COLUMN     "artistId" INTEGER NOT NULL,
ADD COLUMN     "genreId" INTEGER NOT NULL,
ADD COLUMN     "playCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "uploadedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "registration_date",
ADD COLUMN     "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_ArtistToSong";

-- DropTable
DROP TABLE "_GenreToSong";

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
