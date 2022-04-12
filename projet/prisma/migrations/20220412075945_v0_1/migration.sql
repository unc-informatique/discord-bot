-- CreateTable
CREATE TABLE "Contient" (
    "guildId" INTEGER NOT NULL,
    "mentionId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    CONSTRAINT "Contient_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contient_mentionId_fkey" FOREIGN KEY ("mentionId") REFERENCES "Mention" ("diplome") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Emoji" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "parcoursId" TEXT NOT NULL,
    CONSTRAINT "Emoji_parcoursId_fkey" FOREIGN KEY ("parcoursId") REFERENCES "Parcours" ("role") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Emoji" ("code", "nom", "parcoursId") SELECT "code", "nom", "parcoursId" FROM "Emoji";
DROP TABLE "Emoji";
ALTER TABLE "new_Emoji" RENAME TO "Emoji";
CREATE UNIQUE INDEX "Emoji_code_key" ON "Emoji"("code");
CREATE TABLE "new_Parcours" (
    "annee" DATETIME NOT NULL,
    "trec" TEXT NOT NULL,
    "role" TEXT NOT NULL PRIMARY KEY,
    "mentionId" TEXT NOT NULL,
    CONSTRAINT "Parcours_mentionId_fkey" FOREIGN KEY ("mentionId") REFERENCES "Mention" ("diplome") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Parcours" ("annee", "mentionId", "role", "trec") SELECT "annee", "mentionId", "role", "trec" FROM "Parcours";
DROP TABLE "Parcours";
ALTER TABLE "new_Parcours" RENAME TO "Parcours";
CREATE UNIQUE INDEX "Parcours_role_key" ON "Parcours"("role");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Contient_id_key" ON "Contient"("id");
