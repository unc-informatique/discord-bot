/*
  Warnings:

  - You are about to drop the `Contient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `name` on the `Guild` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Contient_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Contient";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GuildContainsMention" (
    "guildId" INTEGER NOT NULL,
    "diplome" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    CONSTRAINT "GuildContainsMention_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GuildContainsMention_diplome_fkey" FOREIGN KEY ("diplome") REFERENCES "Mention" ("diplome") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Config" (
    "cle" TEXT NOT NULL PRIMARY KEY,
    "valeur" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guild" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_Guild" ("id") SELECT "id" FROM "Guild";
DROP TABLE "Guild";
ALTER TABLE "new_Guild" RENAME TO "Guild";
CREATE UNIQUE INDEX "Guild_id_key" ON "Guild"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "GuildContainsMention_id_key" ON "GuildContainsMention"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Config_cle_key" ON "Config"("cle");
