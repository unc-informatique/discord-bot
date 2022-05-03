import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Role } from "discord.js";
import pkg from "@prisma/client";
import logger from "../logger.mjs";


export default {
  data:  new SlashCommandBuilder()
    .setName("add-emoji")
    .setDescription("Ajoute un emoji à un parcours!")
    .addStringOption((option) => option.setName("role").setDescription("ex: L4 INFO TREC7").setRequired(true))
    .addStringOption((option) => option.setName("emoji").setDescription("ex: dog").setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    try {
      await prisma.$connect();
      const Role = interaction.options.getString("role");
      const Emoji = interaction.options.getString("emoji");
      await prisma.parcours.update({
        where: {
          role: Role,
        },
        data: {
            emoji:Emoji,
        },
      });
    } catch (error) {
      logger.error(error, `Command handling error (${error.message})`);
      return interaction.editReply({content:`Command handling error (${error.message})`,ephemeral:true});
    } finally {
      prisma.$disconnect();
    }
    return interaction.editReply('Votre emoji a bien été ajouter/mise à jour.');
  },
};
