import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import pkg from "@prisma/client";
import logger from "../logger.mjs";
import { connexion } from "../utilities/connexion-bdd.mjs";

export default {
  data: new SlashCommandBuilder()
    .setName("add-parcours")
    .setDescription("Ajoute un parcours!")
    .addStringOption((option) => option.setName("discipline").setDescription("ex: Science").setRequired(true))
    .addStringOption((option) => option.setName("diplome").setDescription("ex: Informatique").setRequired(true))
    .addStringOption((option) => option.setName("annee").setDescription("ex: L1/L2/L3/L4").setRequired(true))
    .addStringOption((option) => option.setName("trec").setDescription("ex: TREC5/TREC7").setRequired(true))
    .addStringOption((option) => option.setName("emoji").setDescription("ex: dog").setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    return connexion(prisma, interaction, "Votre parcours a bien été ajoutée.", async function foo() {
      const Discipline = interaction.options.getString("discipline");
      const Diplome = interaction.options.getString("diplome");
      const Annee = interaction.options.getString("annee");
      const TREC = interaction.options.getString("trec");
      const Emoji = interaction.options.getString("emoji");
      await prisma.parcours.create({
        data: {
          discipline: Discipline,
          diplome: Diplome,
          annee: Annee,
          trec: TREC,
          role: Annee + " " + TREC + " " + Diplome.slice(0, 4).toUpperCase(),
          emoji: Emoji,
        },
      });
    });
  },
};
