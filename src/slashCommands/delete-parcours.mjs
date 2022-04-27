import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import pkg from "@prisma/client";
import logger from "../logger.mjs";


export default {
  data:  new SlashCommandBuilder()
    .setName("delete-parcours")
    .setDescription("Supprime un parcours!")
    .addStringOption((option) => option.setName("role").setDescription("ex: L4 TREC7 INFO").setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    try {
      await prisma.$connect();
      const Role = interaction.options.getString("role");
      await prisma.parcours.delete({
        where: {
          role: Role,
        },
      });
    } catch (error) {
      logger.error(error, `Command handling error (${error.message})`);
      return interaction.editReply({content:`Command handling error (${error.message})`,ephemeral:true});
    } finally {
      prisma.$disconnect();
    }
    return interaction.editReply('Le parcours a bien été supprimée.');
  },
};
