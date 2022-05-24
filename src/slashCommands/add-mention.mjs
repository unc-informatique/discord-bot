import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import pkg from "@prisma/client";
import logger from "../logger.mjs";
import { connexion } from "../utilities/connexion-bdd.mjs";

export default {
  data: new SlashCommandBuilder()
    .setName("add-mention")
    .setDescription("Ajoute une mention!")
    .addStringOption((option) => option.setName("discipline").setDescription("ex: Science").setRequired(true))
    .addStringOption((option) => option.setName("diplome").setDescription("ex: Informatique").setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    return connexion(prisma, interaction, "Votre mention a bien été ajoutée.", async function foo() {
      await prisma.$connect();
      const Discipline = interaction.options.getString("discipline");
      const Diplome = interaction.options.getString("diplome");
      await prisma.mention.create({
        data: {
          discipline: Discipline,
          diplome: Diplome,
        },
      });
    });
  },
};
