import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import pkg from '@prisma/client';
const { PrismaClient } = pkg;


export default {
	data: new SlashCommandBuilder()
		.setName('addmention')
		.setDescription('Ajoute une mention en base de données!')
		.addStringOption(option => option.setName('discipline').setDescription('ex: Science').setRequired(true))
		.addStringOption(option => option.setName('diplome').setDescription('ex: Informatique').setRequired(true)),
	/**
	 * 
	 * @param {Client} client 
	 * @param {CommandInteraction} interaction 
	 * @param {String[]} args 
	 */
	 async execute(client,interaction,args){
		const prisma = new PrismaClient();
		try{
		await prisma.$connect()
		const Discipline =  interaction.option.getString('discipline');
		const Diplome = interaction.option.getString('diplome')
		const newMention = await prisma.mention.create({
			data: {
				discipline: Discipline,
				diplome:Diplome,
			},
		});
		const mention = await prisma.mention.findMany();
		await interaction.reply(mention.toString());
		}
		catch(error){
			logger.error(error, `Command handling error (${error.message})`);
			await interaction.reply(`Command handling error (${error.message})`);
		}
		finally{
			prisma.$disconnect();
		}
	},
};