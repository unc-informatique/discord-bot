import pino from "pino";
import { production } from "./config.mjs";

// configuration des sorties
// https://github.com/pinojs/pino/blob/master/docs/transports.md
let targets = [
  {
    level: "info",
    target: "pino/file",
    options: { destination: "logs/info.log", mkdir: true, sync: false },
  },
  {
    level: "error",
    target: "pino/file",
    options: { destination: "logs/error.log", mkdir: true, sync: false },
  },
];

if (!production) {
  targets.push({
    level: "debug",
    target: "pino-pretty",
  });
}

const logger = pino(
  {
    name: "starter",
    level: production ? "info" : "debug",
  },
  pino.transport({
    targets,
  }),
);

// info
logger.debug(`NODE_ENV = ${process.env.NODE_ENV}`);
logger.debug(`Node version = ${process.version}`);
logger.debug(`logger.level = ${logger.level}`);

export default logger;
