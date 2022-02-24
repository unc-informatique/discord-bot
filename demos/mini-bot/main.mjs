// BUG sous Windows 10 de ROmulusFR, ESLint ne trouve pas les modules standard en node: ou /promises, mais IntelliType oui...
/* eslint "node/no-missing-import": "off"*/
/* eslint "import/no-unresolved": "off",*/

import process from "node:process";
import { Client, Intents } from "discord.js";
import { token } from "./config.mjs";
import logger from "./logger.mjs";

/**
 * @param  {object|string} signal - The software interrupt causing exit
 * @param  {integer} code=0 - The return code to process.exit()
 */
function gracefulExitHandler(signal, code = 0) {
  logger.info(`Exiting gracefully after ${signal}.`);
  if (client && client.isReady()) client.destroy();
  // eslint-disable-next-line no-process-exit, unicorn/no-process-exit
  process.exit(code);
}

// gracious stop on SIGINT (Ctrl-C and PM2) and SIGHUP.
// Mind the one used by nodemon to reload (in package.json)
// https://pm2.keymetrics.io/docs/usage/signals-clean-restart/
// https://github.com/remy/nodemon

// /!\ Windows 10 don't like SIGHUP signal (and passes always SIGINT)
const terminationSignals = ["SIGINT", "SIGUSR2"];
terminationSignals.map((signal) => process.on(signal, () => gracefulExitHandler(signal)));

// (a)synchronous console logging at the very end
process.on("exit", (code) => {
  logger.warn(`Process (${process.pid}) exit with ${code}`);
});

// centralized error handler
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/catchunhandledpromiserejection.md
process.on("uncaughtException", (error, origin) => {
  logger.fatal(error, `uncaughtException handler from ${origin}`);
  gracefulExitHandler("uncaughtException", 1);
});

// Create a new client instance
// https://discordjs.guide/creating-your-bot/#creating-the-main-file
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  // send a "ready" signal to PM2
  // https://pm2.keymetrics.io/docs/usage/signals-clean-restart/
  // https://nodejs.org/api/process.html#processsendmessage-sendhandle-options-callback
  // If Node.js was not spawned with an IPC channel, process.send will be undefined.
  if (process.send) {
    process.send("ready");
  } else {
    logger.info(`Running non-child process (no process.send)`);
  }
  logger.info(`Logged in as ${client.user.tag}!`);
});

// Log client error, but do not re-raise
client.on("error", (error) => {
  logger.error(error, `Bot ${client.user.tag} received an error`);
});
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
        } = interaction;
        logger.info(`Ping from ${tag} (id=${id})`);
        await interaction.reply("Pong!");
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

// Commands handler
client.on("interactionCreate", commandHandler);

// Login to Discord with your client's token
client.login(token);
