-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "playcount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "_GenreArtists" ADD CONSTRAINT "_GenreArtists_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_GenreArtists_AB_unique";

-- CreateTable
CREATE TABLE "SongPlayHistory" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "songId" UUID NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SongPlayHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SongPlayHistory_userId_songId_key" ON "SongPlayHistory"("userId", "songId");

-- AddForeignKey
ALTER TABLE "SongPlayHistory" ADD CONSTRAINT "SongPlayHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongPlayHistory" ADD CONSTRAINT "SongPlayHistory_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
