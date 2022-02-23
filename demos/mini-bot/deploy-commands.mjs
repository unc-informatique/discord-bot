import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { token, clientId, guildId } from "./config.mjs";
import logger from "./logger.mjs";

const rest = new REST({ version: "9" }).setToken(token);

const commands = [
  new SlashCommandBuilder().setName("ping").setDescription("Replies with pong!"),
  new SlashCommandBuilder().setName("server").setDescription("Replies with server info!"),
  new SlashCommandBuilder().setName("user").setDescription("Replies with user info!"),
].map((command) => command.toJSON());

try {
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
  logger.info("Successfully registered application commands.");
} catch (error) {
  logger.error(error);
}
