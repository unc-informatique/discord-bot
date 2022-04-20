import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "@discord.js";
import { PrismaClient } from '@prisma/client'


module.exports = {
	data: new SlashCommandBuilder()
		.setName('addMention')
		.setDescription('Ajoute une mention en base de données!')
		.addStringOption(option => option.setName('Discipline').setDescription('ex: Science').setRequired(true))
		.addStringOption(option => option.setName('Diplome').setDescription('ex: Informatique').setRequired(true)),
	/**
	 * 
	 * @param {Client} client 
	 * @param {CommandInteraction} interaction 
	 * @param {String[]} args 
	 */
	run: async (client,interaction,args) => {
		const prisma = new PrismaClient();
		const Discipline =  interaction.option.getString('Discipline');
		const Diplome = interaction.option.getString('Diplome')
		const newMention = await prisma.mention.create({
			data: {
				discipline: Discipline,
				diplome:Diplome,
			},
		});
		const mention = await prisma.mention.findMany();
		await interaction.reply(mention.toString());
	},
};