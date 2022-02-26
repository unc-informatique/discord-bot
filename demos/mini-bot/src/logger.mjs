import pino from "pino";
import { production } from "./config.mjs";

const synchronousLogging = false;

// configuration des sorties
// https://github.com/pinojs/pino/blob/master/docs/transports.md
let targets = [
  {
    level: "info",
    target: "pino/file",
    options: { destination: "logs/info.log", mkdir: true, sync: synchronousLogging },
  },
  {
    level: "error",
    target: "pino/file",
    options: { destination: "logs/error.log", mkdir: true, sync: synchronousLogging },
  },
  {
    level: "debug",
    target: "pino-pretty",
    options: { translateTime: "SYS:standard", sync: synchronousLogging },
  },
];

const logger = pino(
  {
    name: "mini-bot",
    level: production ? "info" : "debug",
  },
  pino.transport({
    targets,
  }),
);

// info
logger.debug(`Node.js v${process.version}`);
logger.debug(`Platform = ${process.platform}`);
logger.debug(`NODE_ENV = ${process.env.NODE_ENV}`);
logger.debug(`logger.level = ${logger.level}`);

export default logger;
