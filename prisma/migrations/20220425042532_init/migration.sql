-- CreateTable
CREATE TABLE "Guild" (
    "id" INTEGER NOT NULL PRIMARY KEY 
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" INTEGER NOT NULL,
    "guildId" INTEGER NOT NULL,

    PRIMARY KEY ("id", "guildId"),
    CONSTRAINT "Channel_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY ,
    "guildId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,
    CONSTRAINT "Message_channelId_guildId_fkey" FOREIGN KEY ("channelId", "guildId") REFERENCES "Channel" ("id", "guildId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mention" (
    "discipline" TEXT NOT NULL,
    "diplome" TEXT NOT NULL,

    PRIMARY KEY ("discipline", "diplome")
);

-- CreateTable
CREATE TABLE "Parcours" (
    "annee" TEXT NOT NULL,
    "trec" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "edtLastModiified" DATETIME,
    "edtChemin" TEXT,
    "discipline" TEXT NOT NULL,
    "diplome" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    PRIMARY KEY ("annee", "trec"),
    CONSTRAINT "Parcours_discipline_diplome_fkey" FOREIGN KEY ("discipline", "diplome") REFERENCES "Mention" ("discipline", "diplome") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GuildContainsMention" (
    "guildId" INTEGER NOT NULL,
    "discipline" TEXT NOT NULL,
    "diplome" TEXT NOT NULL,

    PRIMARY KEY ("guildId", "diplome"),
    CONSTRAINT "GuildContainsMention_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GuildContainsMention_discipline_diplome_fkey" FOREIGN KEY ("discipline", "diplome") REFERENCES "Mention" ("discipline", "diplome") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Config" (
    "cle" TEXT NOT NULL PRIMARY KEY,
    "valeur" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Parcours_role_key" ON "Parcours"("role");

PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;