/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_uploaded_by_id_fkey";

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "uploaded_by_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
