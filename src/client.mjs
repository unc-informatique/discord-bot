import { token } from "./config.mjs";
import fs from "node:fs";
import { Client, Collection ,Intents } from 'discord.js';
import path from 'node:path';
import process from "node:process";
import events from "node:events";
import logger from "./logger.mjs";



// Create a new client instance.
// Global module variable/singleton
// https://discordjs.guide/creating-your-bot/#creating-the-main-file
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const directoryPath = path.resolve("./src", "./slashCommands");
const commandFiles = fs.readdirSync(directoryPath).filter((file) => file.endsWith(".mjs"));

for (const file of commandFiles) {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const command = import(`./slashCommands/${file}`);
    command.then(function (result) {
      client.commands.set(result.default.data.name,result);
    });
}

// Log client error, but do not re-raise
client.on("error", (error) => {
  logger.error(error, `Bot ${client.user.tag} received an error`);
});

// Installs commands handler
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
    await interaction.deferReply();
		await command.default.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

/**
 * Log and install client
 */
async function login() {
  // idempotent operation
  if (client.isReady()) {
    logger.warn(`${client.user.tag} already logged, noop`);
    return;
  }

  // Login to Discord with your client's token
  client.login(token);

  // promisified event, see
  // https://nodejs.org/api/events.html#eventsonceemitter-name-options
  await events.once(client, "ready");
  // send a "ready" signal to PM2
  // https://pm2.keymetrics.io/docs/usage/signals-clean-restart/
  // https://nodejs.org/api/process.html#processsendmessage-sendhandle-options-callback
  // If Node.js was not spawned with an IPC channel, process.send will be undefined.
  if (process.send) {
    logger.debug(`Running child process, sending process.send("ready")`);
    process.send("ready");
  } else {
    logger.debug(`Running non-child process, no process.send()`);
  }

  logger.info(`Logged in as ${client.user.tag}`);
}

export default login;