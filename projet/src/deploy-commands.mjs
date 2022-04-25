import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { token, clientId, guildId } from "./config.mjs";
import { SlashCommandBuilder } from "@discordjs/builders";
import logger from "./logger.mjs";

const commands = [
	new SlashCommandBuilder().setName("add-mention").setDescription("Ajoute une mention en base de données!")
    .addStringOption((option) => option.setName("discipline").setDescription("ex: Science").setRequired(true))
    .addStringOption((option) => option.setName("diplome").setDescription("ex: Informatique").setRequired(true)),

  new SlashCommandBuilder().setName("delete-mention").setDescription("Supprime une mention en base de données!")
    .addStringOption((option) => option.setName("discipline").setDescription("ex: Science").setRequired(true))
    .addStringOption((option) => option.setName("diplome").setDescription("ex: Informatique").setRequired(true)),
  
    new SlashCommandBuilder().setName("print-mention").setDescription("affiche toutes les mentions")
  ].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

try {
	await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
	logger.info("Successfully registered application commands.");
  } catch (error) {
	logger.error(error);
  }
  