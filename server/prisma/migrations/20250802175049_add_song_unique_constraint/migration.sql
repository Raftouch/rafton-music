/*
  Warnings:

  - A unique constraint covering the columns `[title,artistId]` on the table `Song` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Song_title_artistId_key" ON "Song"("title", "artistId");
