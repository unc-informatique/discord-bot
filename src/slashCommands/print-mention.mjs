import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import pkg from "@prisma/client";
import logger from "../logger.mjs";


export default {
  data:  new SlashCommandBuilder()
    .setName("print-mention")
    .setDescription("affiche toutes les mentions"),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    try {
      await prisma.$connect();
      const  mentions = await (await prisma.mention.findMany());
      return interaction.editReply(JSON.stringify(mentions));
    } catch (error) {
      logger.error(error, `Command handling error (${error.message})`);
      return interaction.editReply({content:`Command handling error (${error.message})`,ephemeral:true});
    } finally {
      prisma.$disconnect();
    }
  },
};
