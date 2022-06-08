import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Role } from "discord.js";
import pkg from "@prisma/client";
import logger from "../logger.mjs";

import { connexion } from "../utilities/connexion-bdd.mjs";

export default {
  data: new SlashCommandBuilder()
    .setName("delete-emoji")
    .setDescription("Supprimme un emoji d'un parcours!")
    .addStringOption((option) => option.setName("role").setDescription("ex: L4 INFO TREC7").setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(client,interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    return connexion(prisma, interaction, "Votre emoji a bien été supprimmer.", async function foo() {
      await prisma.$connect();
      const Role = interaction.options.getString("role");
      const Emoji = interaction.options.getString("emoji");
      await prisma.parcours.update({
        where: {
          role: Role,
        },
        data: {
          emoji: Emoji,
        },
      });
    });
  },
};
