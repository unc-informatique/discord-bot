-- CreateTable
CREATE TABLE "Guild" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" INTEGER NOT NULL,
    CONSTRAINT "Channel_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channelId" INTEGER NOT NULL,
    CONSTRAINT "Message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mention" (
    "discipline" TEXT NOT NULL,
    "diplome" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Parcours" (
    "annee" DATETIME NOT NULL,
    "trec" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "mentionId" TEXT NOT NULL,
    CONSTRAINT "Parcours_mentionId_fkey" FOREIGN KEY ("mentionId") REFERENCES "Mention" ("diplome") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Emoji" (
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "parcoursId" TEXT NOT NULL,
    CONSTRAINT "Emoji_parcoursId_fkey" FOREIGN KEY ("parcoursId") REFERENCES "Parcours" ("role") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_id_key" ON "Guild"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Parcours_role_key" ON "Parcours"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Emoji_code_key" ON "Emoji"("code");
