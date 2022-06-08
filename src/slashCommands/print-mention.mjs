import { SlashCommandBuilder } from "@discordjs/builders";
import pkg from "@prisma/client";
import { connexionPrint } from "../utilities/connexion-bdd.mjs";

export default {
  data: new SlashCommandBuilder().setName("print-mention").setDescription("affiche toutes les mentions"),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(client,interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    return connexionPrint(prisma, interaction, "", async function foo() {
      await prisma.$connect();
      const mentions = await prisma.mention.findMany();
      return mentions;
    });
  },
};
