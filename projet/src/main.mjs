// BUG sous Windows 10 de ROmulusFR, ESLint ne trouve pas les modules standard en node: ou /promises, mais IntelliType oui...
/* eslint "node/no-missing-import": "off"*/
/* eslint "import/no-unresolved": "off",*/

import logger from "./logger.mjs";
import login from "./client.mjs";

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
terminationSignals.map((signal) => process.once(signal, () => gracefulExitHandler(signal)));

// (a)synchronous console logging at the very end
process.once("exit", (code) => {
  logger.warn(`Process (${process.pid}) exit with ${code}`);
});

// centralized error handler
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/catchunhandledpromiserejection.md
process.once("uncaughtException", (error, origin) => {
  logger.fatal(error, `uncaughtException handler from ${origin}`);
  gracefulExitHandler("uncaughtException", 1);
});

const client = await login();
