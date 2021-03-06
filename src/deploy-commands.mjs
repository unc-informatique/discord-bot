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

  new SlashCommandBuilder().setName("print-mention").setDescription("affiche toutes les mentions"),

  new SlashCommandBuilder().setName("add-parcours").setDescription("Ajoute un parcours!")
    .addStringOption((option) => option.setName("discipline").setDescription("ex: Science").setRequired(true))
    .addStringOption((option) => option.setName("diplome").setDescription("ex: Informatique").setRequired(true))
    .addStringOption((option) => option.setName("annee").setDescription("ex: L1/L2/L3/L4").setRequired(true))
    .addStringOption((option) => option.setName("trec").setDescription("ex: TREC5/TREC7").setRequired(true)),

  new SlashCommandBuilder().setName("print-parcours").setDescription("affiches tous les parcours"),

  new SlashCommandBuilder().setName("delete-parcours").setDescription("Supprime un parcours!")
    .addStringOption((option) => option.setName("role").setDescription("ex: L4 TREC7 INFO").setRequired(true))
  ].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

try {
	await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
	logger.info("Successfully registered application commands.");
  } catch (error) {
	logger.error(error);
  }
