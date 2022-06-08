import { SlashCommandBuilder } from "@discordjs/builders";
import pkg from "@prisma/client";
import logger from "../logger.mjs";
import { connexion } from "../utilities/connexion-bdd.mjs";

export default {
  data: new SlashCommandBuilder()
    .setName("add-emoji")
    .setDescription("Ajoute un emoji à un parcours!")
    .addStringOption((option) => option.setName("role").setDescription("ex: L4 INFO TREC7").setRequired(true))
    .addStringOption((option) => option.setName("emoji").setDescription("ex: dog").setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(client,interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    return connexion(prisma, interaction, "Votre emoji a bien été ajouter/mise à jour.", async function foo() {
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
