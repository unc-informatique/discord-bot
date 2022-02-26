import process from "node:process";
import events from "node:events";
import { Client, Intents } from "discord.js";
import logger from "./logger.mjs";
import { token } from "./config.mjs";

/**
 * @param  {Interfaction} interaction - When someone uses a guild's command
 *
 * See https://discord.js.org/#/docs/discord.js/stable/class/Interaction
 *
 * Supported commands :
 *
 * - ping: answers pong and log a message
 * - server: shows some statistics
 * - user: shows info about the interacting user
 */
async function commandHandler(interaction) {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;

  try {
    switch (commandName) {
      case "ping": {
        const {
          user: { tag, id },
          createdTimestamp,
        } = interaction;
        logger.info(`Ping from ${tag} (id=${id})`);
        const sent = await interaction.reply({
          content: `Pong! (WS heartbeat ${client.ws.ping}ms)...`,
          fetchReply: true,
        });
        // await interaction.followUp("Pong again!");
        await interaction.editReply(`${sent} RTT in ${sent.createdTimestamp - createdTimestamp}ms.`);
        break;
      }
      case "server": {
        const {
          guild: { name, memberCount },
        } = interaction;
        await interaction.reply(`Server name: ${name}\nTotal members: ${memberCount}`);
        break;
      }
      case "user": {
        const {
          user: { tag, id },
        } = interaction;
        await interaction.reply(`Your tag: ${tag}\nYour id: ${id}`);
        break;
      }
      default: {
        logger.warn(`received unknown command ${commandName}`);
      }
    }
  } catch (error) {
    logger.error(error, `Command handling error (${error.message})`);
  }
}

// Create a new client instance.
// Global module variable/singleton
// https://discordjs.guide/creating-your-bot/#creating-the-main-file
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Log client error, but do not re-raise
client.on("error", (error) => {
  logger.error(error, `Bot ${client.user.tag} received an error`);
});

// Installs commands handler
client.on("interactionCreate", commandHandler);

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
