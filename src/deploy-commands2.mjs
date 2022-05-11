import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { token, clientId, guildId } from "./config.mjs";
import logger from "./logger.mjs";
import path from "path";
import fs from "fs";

const commands = [];
const directoryPath = path.resolve("./src", "./slashCommands");
const commandFiles = fs.readdirSync(directoryPath).filter((file) => file.endsWith(".mjs"));

for (const file of commandFiles) {
  const command = await import(`./slashCommands/${file}`);
  commands.push(command.default.data.toJSON());
  //command.then(function(result){
  //	commands.push(result.default.data.toJSON());
  //});
}

const rest = new REST({ version: "9" }).setToken(token);

try {
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {body:commands});
  logger.info("Successfully registered application commands.");
} catch (error) {
  logger.error(error);
}
