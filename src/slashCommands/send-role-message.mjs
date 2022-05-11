import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import pkg from "@prisma/client";
import logger from "../logger.mjs";


export default {
  data:  new SlashCommandBuilder()
    .setName("send-role-message")
    .setDescription("Envoie un message pour claim son rôle en fonction d'un emoji")
    .addStringOption((option) => option.setName("discipline").setDescription("ex: Science").setRequired(true))
    .addStringOption((option) => option.setName("diplome").setDescription("ex: Informatique").setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   */
   async execute(interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    const reactions = [];
    let messageText = "Choisissez votre rôle sur ce serveur en réagissant à ce message avec l'emoji de votre promotion dans la liste ci-dessous.\n";
    try {
      await prisma.$connect();
      const Discipline = interaction.options.getString("discipline");
      const Diplome = interaction.options.getString("diplome");
      const parcours = await prisma.parcours.findMany({
        where: {
          discipline : Discipline,
          diplome :Diplome
        },
        select: {
          emoji : true,
          role : true,
        }
      });
      for(const key in parcours){
          const emoji = parcours[key].emoji;
          reactions.push(interaction.guild.emojis.resolveId("dog face"));
          
          const role = parcours[key].role;
          messageText += `:${emoji}: = ${role}\n `;
      }
    } catch (error) {
      logger.error(error, `Command handling error (${error.message})`);
      return interaction.editReply({content:`Command handling error (${error.message})`,ephemeral:true});
    } finally {
      prisma.$disconnect();
    }
    const message = await interaction.editReply(messageText);
    return message.react(reactions);
  },
};
