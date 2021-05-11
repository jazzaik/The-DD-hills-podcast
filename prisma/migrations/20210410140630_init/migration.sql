/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Podcast` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Podcast` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Podcast" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filename" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" INTEGER,
    FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Podcast" ("id", "createdAt", "filename", "title", "authorId") SELECT "id", "createdAt", "filename", "title", "authorId" FROM "Podcast";
DROP TABLE "Podcast";
ALTER TABLE "new_Podcast" RENAME TO "Podcast";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
