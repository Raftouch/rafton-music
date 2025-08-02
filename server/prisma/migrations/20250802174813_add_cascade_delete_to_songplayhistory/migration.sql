-- DropForeignKey
ALTER TABLE "SongPlayHistory" DROP CONSTRAINT "SongPlayHistory_songId_fkey";

-- AddForeignKey
ALTER TABLE "SongPlayHistory" ADD CONSTRAINT "SongPlayHistory_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
