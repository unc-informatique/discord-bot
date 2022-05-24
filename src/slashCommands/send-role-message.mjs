import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction } from "discord.js";
import pkg from "@prisma/client";
import logger from "../logger.mjs";
import { clientId } from "../config.mjs";

export default {
  data:  new SlashCommandBuilder()
    .setName("send-role-message")
    .setDescription("Envoie un message pour claim son rôle en fonction d'un emoji")
    .addStringOption((option) => option.setName("discipline").setDescription("ex: Science").setRequired(true))
    .addStringOption((option) => option.setName("diplome").setDescription("ex: Informatique").setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   */
   async execute(client,interaction) {
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();
    const reactions = [];
    const emojiToRole = {};
    let messageText = "Choisissez votre rôle sur ce serveur en réagissant à ce message avec l'emoji de votre promotion.\n";
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
          const emoji = (parcours[key].emoji).replace(/\s+/g, '');
          reactions.push(emoji);
        
          const role = parcours[key].role;
          messageText += `${emoji} = ${role}\n `;

          // eslint-disable-next-line security/detect-object-injection
          emojiToRole[emoji] = role;
        }
    } catch (error) {
      logger.error(error, `Command handling error (${error.message})`);
      return interaction.editReply({content:`Command handling error (${error.message})`,ephemeral:true});
    } finally {
      prisma.$disconnect();
    }
    
    const message = await interaction.editReply({content: messageText, fetchReply: true });
    //ajout des réactions en dessous du messages
    for(const emoji of reactions){
      message.react(emoji);
    }

    const handleReaction = (reaction, user, add) => {
      if(user.id === clientId){
        return
      }
      //récupération de l'emoji dans le message
      const emoji = reaction._emoji;

      //récupération de la guild
      const { guild } = reaction.message;
      
      //récupération du nom du role a partir de l'emoji
      const roleName = emojiToRole[emoji];

      if(!roleName) {
        return
      }
      
      //récupération du role
      const role = guild.roles.cache.find(role => role.name === roleName);
      //récupération du membre
      const member = guild.members.cache.find(member => member.id === user.id);
      
      if(add) {
        member.roles.add(role);
      }else{
        member.roles.remove(role);
      }
    }

    client.on('messageReactionAdd',(reaction, user) => {;
      if(reaction.message.channel.id === interaction.channelId){
        handleReaction(reaction,user,true);
      }
    });
    
    client.on('messageReactionRemove',(reaction, user) => {
      handleReaction(reaction,user,false);
    });
  },
};