import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import pkg from "@prisma/client";
import logger from "../logger.mjs";
import { connexion } from "../utilities/connexion-bdd.mjs";

export default {
  data: new SlashCommandBuilder()
    .setName("delete-parcours")
    .setDescription("Supprime un parcours!")
    .addStringOption((option) => option.setName("role").setDescription("ex: L4 TREC7 INFO").setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(client,interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    return connexion(prisma, interaction, "Le parcours a bien été supprimée.", async function foo() {
      await prisma.$connect();
      const Role = interaction.options.getString("role");
      await prisma.parcours.delete({
        where: {
          role: Role,
        },
      });
    });
  },
};
