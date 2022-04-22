import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import pkg from "@prisma/client";
import logger from "../logger.mjs";


export default {
  data:  new SlashCommandBuilder()
    .setName("addmention")
    .setDescription("Ajoute une mention en base de données!")
    .addStringOption((option) => option.setName("discipline").setDescription("ex: Science").setRequired(true))
    .addStringOption((option) => option.setName("diplome").setDescription("ex: Informatique").setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    try {
      await prisma.$connect();
      const Discipline = interaction.options.getString("discipline");
      const Diplome = interaction.options.getString("diplome");
      await prisma.mention.create({
        data: {
          discipline: Discipline,
          diplome: Diplome,
        },
      });
    } catch (error) {
      logger.error(error, `Command handling error (${error.message})`);
      return interaction.editReply('Une erreure est survenu dans le processus d ajout de votre mention en base de données');
    } finally {
      prisma.$disconnect();
    }
    return interaction.editReply('Votre mention a bien été ajoutée.');
  },
};
