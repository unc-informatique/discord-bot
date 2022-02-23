// BUG sous Windows 10 de ROmulusFR, ESLint ne trouve pas les modules standard en node: ou /promises, mais IntelliType oui...
/* eslint "node/no-missing-import": "off"*/
/* eslint "import/no-unresolved": "off",*/

import process from "node:process";
import { Client, Intents } from "discord.js";
import { token } from "./config.mjs";
import logger from "./logger.mjs";

function gracefulExit(code) {
  client.destroy();
  // eslint-disable-next-line no-process-exit,unicorn/no-process-exit
  process.exit(code);
}

const signalHandler = (signal) => {
  logger.warn(`Exiting gracefully after ${signal}.`);
  gracefulExit(0);
};
// arrêt normal sur SIGINT (Ctrl-C) etc.
// dont signal https://github.com/remy/nodemon
process.on("SIGHUP", signalHandler);
process.on("SIGINT", signalHandler);

// affichage synchrone de la fin de l'appli
process.on("exit", (code) => {
  console.info(`Process (${process.pid}) exit with ${code}`);
});

// attrapeur central d'exceptions
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/catchunhandledpromiserejection.md
process.on("uncaughtException", (error, origin) => {
  logger.fatal(error, `uncaughtException handler from ${origin}`);
  gracefulExit(1);
});

// https://discordjs.guide/creating-your-bot/#creating-the-main-file
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  logger.info(`Logged in as ${client.user.tag}!`);
});

client.on("error", (error) => {
  logger.error(error, `Bot ${client.user.tag} received an error`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  switch (commandName) {
    case "ping": {
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
});

// Login to Discord with your client's token
client.login(token);
