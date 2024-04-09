/*
  Warnings:

  - You are about to drop the `artists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classify` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `create` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favourite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `genres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `listen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `songs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "classify" DROP CONSTRAINT "classify_id_genre_fkey";

-- DropForeignKey
ALTER TABLE "classify" DROP CONSTRAINT "classify_id_song_fkey";

-- DropForeignKey
ALTER TABLE "create" DROP CONSTRAINT "create_id_artist_fkey";

-- DropForeignKey
ALTER TABLE "create" DROP CONSTRAINT "create_id_song_fkey";

-- DropForeignKey
ALTER TABLE "favourite" DROP CONSTRAINT "favourite_id_song_fkey";

-- DropForeignKey
ALTER TABLE "favourite" DROP CONSTRAINT "favourite_id_user_fkey";

-- DropForeignKey
ALTER TABLE "listen" DROP CONSTRAINT "listen_id_song_fkey";

-- DropForeignKey
ALTER TABLE "listen" DROP CONSTRAINT "listen_id_user_fkey";

-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_user_id_fkey";

-- DropTable
DROP TABLE "artists";

-- DropTable
DROP TABLE "classify";

-- DropTable
DROP TABLE "create";

-- DropTable
DROP TABLE "favourite";

-- DropTable
DROP TABLE "genres";

-- DropTable
DROP TABLE "listen";

-- DropTable
DROP TABLE "songs";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Artist" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" UUID NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "role" VARCHAR(5),
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "registeredAt" DATE NOT NULL DEFAULT CURRENT_DATE,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" UUID NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "image" VARCHAR(255),
    "audio" VARCHAR(255),
    "playcount" INTEGER,
    "uploadedAt" DATE NOT NULL DEFAULT CURRENT_DATE,
    "artistId" UUID,
    "genreId" UUID NOT NULL,
    "uploadedById" UUID,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArtistSongs" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreArtists" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ListenedSongs" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoriteSongs" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistSongs_AB_unique" ON "_ArtistSongs"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistSongs_B_index" ON "_ArtistSongs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreArtists_AB_unique" ON "_GenreArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreArtists_B_index" ON "_GenreArtists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ListenedSongs_AB_unique" ON "_ListenedSongs"("A", "B");

-- CreateIndex
CREATE INDEX "_ListenedSongs_B_index" ON "_ListenedSongs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteSongs_AB_unique" ON "_FavoriteSongs"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteSongs_B_index" ON "_FavoriteSongs"("B");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistSongs" ADD CONSTRAINT "_ArtistSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistSongs" ADD CONSTRAINT "_ArtistSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreArtists" ADD CONSTRAINT "_GenreArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreArtists" ADD CONSTRAINT "_GenreArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListenedSongs" ADD CONSTRAINT "_ListenedSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListenedSongs" ADD CONSTRAINT "_ListenedSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteSongs" ADD CONSTRAINT "_FavoriteSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteSongs" ADD CONSTRAINT "_FavoriteSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
