/*
  Warnings:

  - You are about to alter the column `name` on the `artists` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `type` on the `genres` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `title` on the `songs` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `image` on the `songs` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `audio` on the `songs` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

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

-- AlterTable
ALTER TABLE "artists" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "genres" ALTER COLUMN "type" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "songs" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "image" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "audio" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "uploadedat" SET DEFAULT CURRENT_DATE,
ALTER COLUMN "uploadedat" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" VARCHAR(5),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "registeredat" SET DEFAULT CURRENT_DATE,
ALTER COLUMN "registeredat" SET DATA TYPE DATE,
ALTER COLUMN "updatedat" SET DEFAULT CURRENT_DATE,
ALTER COLUMN "updatedat" SET DATA TYPE DATE;

-- DropEnum
DROP TYPE "Role";

-- AddForeignKey
ALTER TABLE "classify" ADD CONSTRAINT "classify_id_genre_fkey" FOREIGN KEY ("id_genre") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "classify" ADD CONSTRAINT "classify_id_song_fkey" FOREIGN KEY ("id_song") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "create" ADD CONSTRAINT "create_id_artist_fkey" FOREIGN KEY ("id_artist") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "create" ADD CONSTRAINT "create_id_song_fkey" FOREIGN KEY ("id_song") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favourite" ADD CONSTRAINT "favourite_id_song_fkey" FOREIGN KEY ("id_song") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favourite" ADD CONSTRAINT "favourite_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listen" ADD CONSTRAINT "listen_id_song_fkey" FOREIGN KEY ("id_song") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listen" ADD CONSTRAINT "listen_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
