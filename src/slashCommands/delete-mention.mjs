import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import pkg from "@prisma/client";
import { connexion } from "../utilities/connexion-bdd.mjs";

export default {
  data: new SlashCommandBuilder()
    .setName("delete-mention")
    .setDescription("Supprime une mention!")
    .addStringOption((option) => option.setName("discipline").setDescription("ex: Science").setRequired(true))
    .addStringOption((option) => option.setName("diplome").setDescription("ex: Informatique").setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    return connexion(prisma, interaction, "Votre mention a bien été supprimer.", async function foo() {
      await prisma.$connect();
      const Discipline = interaction.options.getString("discipline");
      const Diplome = interaction.options.getString("diplome");
      await prisma.mention.delete({
        where: {
          discipline_diplome: { discipline: Discipline, diplome: Diplome },
        },
      });
    });
  },
};
