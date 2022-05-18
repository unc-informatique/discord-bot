import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import logger from "../logger.mjs";


export default {
  data:  new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Supprime des messages!")
    .addStringOption((option) => option.setName("nombre").setDescription("ex: 5").setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      const Nombre = interaction.options.getInt("nombre");

      //action ici
      let i = 0;
      while (i < Nombre){
          if (true) {

              i++;
          }

      }

    } catch (error) {
      logger.error(error, `Command handling error (${error.message})`);
      return interaction.editReply({content:`Command handling error (${error.message})`,ephemeral:true});
    }
    // return interaction.editReply('La mention a bien été supprimée.');
  },
};
