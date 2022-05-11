import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import pkg from "@prisma/client";
import logger from "../logger.mjs";
import { connexion } from "../utilities/connexion-bdd.mjs";


export default {
  data:  new SlashCommandBuilder()
    .setName("print-parcours")
    .setDescription("affiche tous les parcours"),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    return connexion(prisma,interaction,'',async function foo(){
      await prisma.$connect();
      const  parcours = await (await prisma.parcours.findMany());
      return interaction.editReply(JSON.stringify(parcours));
    });
  },
};