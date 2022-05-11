import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import pkg from "@prisma/client";
import logger from "../logger.mjs";
import { connexion } from "../utilities/connexion-bdd.mjs";


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
    return connexion(prisma,interaction,'',async function foo(){
      await prisma.$connect();
      const  mentions = await (await prisma.mention.findMany());
      return interaction.editReply(JSON.stringify(mentions));
    })
  },
};
