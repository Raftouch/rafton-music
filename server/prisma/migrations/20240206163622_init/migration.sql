-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADMIN');

-- CreateTable
CREATE TABLE "artists" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classify" (
    "id_song" UUID NOT NULL,
    "id_genre" UUID NOT NULL,

    CONSTRAINT "classify_pkey" PRIMARY KEY ("id_song","id_genre")
);

-- CreateTable
CREATE TABLE "create" (
    "id_artist" UUID NOT NULL,
    "id_song" UUID NOT NULL,

    CONSTRAINT "create_pkey" PRIMARY KEY ("id_artist","id_song")
);

-- CreateTable
CREATE TABLE "favourite" (
    "id_song" UUID NOT NULL,
    "id_user" UUID NOT NULL,

    CONSTRAINT "favourite_pkey" PRIMARY KEY ("id_song","id_user")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" UUID NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listen" (
    "id_song" UUID NOT NULL,
    "id_user" UUID NOT NULL,

    CONSTRAINT "listen_pkey" PRIMARY KEY ("id_song","id_user")
);

-- CreateTable
CREATE TABLE "songs" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "audio" TEXT,
    "playcount" INTEGER,
    "uploadedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "artist_id" UUID,
    "genre_id" UUID,
    "user_id" UUID,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'BASIC',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "registeredat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "classify" ADD CONSTRAINT "classify_id_song_fkey" FOREIGN KEY ("id_song") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classify" ADD CONSTRAINT "classify_id_genre_fkey" FOREIGN KEY ("id_genre") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "create" ADD CONSTRAINT "create_id_artist_fkey" FOREIGN KEY ("id_artist") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "create" ADD CONSTRAINT "create_id_song_fkey" FOREIGN KEY ("id_song") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourite" ADD CONSTRAINT "favourite_id_song_fkey" FOREIGN KEY ("id_song") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourite" ADD CONSTRAINT "favourite_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listen" ADD CONSTRAINT "listen_id_song_fkey" FOREIGN KEY ("id_song") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listen" ADD CONSTRAINT "listen_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
