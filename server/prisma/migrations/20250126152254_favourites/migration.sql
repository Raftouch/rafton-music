-- CreateTable
CREATE TABLE "_FavouriteSongs" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_FavouriteSongs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FavouriteSongs_B_index" ON "_FavouriteSongs"("B");

-- AddForeignKey
ALTER TABLE "_FavouriteSongs" ADD CONSTRAINT "_FavouriteSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouriteSongs" ADD CONSTRAINT "_FavouriteSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
