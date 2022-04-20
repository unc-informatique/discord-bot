// BUG sous Windows 10 de ROmulusFR, ESLint ne trouve pas les modules standard en node: ou /promises, mais IntelliType oui...
/* eslint "node/no-missing-import": "off"*/
/* eslint "import/no-unresolved": "off",*/

// version Promises de setTimeout, celle par défaut étant en callback
import { setTimeout } from "node:timers/promises";
import { randomInt } from "node:crypto";

// accès aux variables d'environnement via dotenv
import dotenv from "dotenv";
dotenv.config({ debug: true });

// logging
import pino from "pino";

// configuration des sorties
// https://github.com/pinojs/pino/blob/master/docs/transports.md
const transport = pino.transport({
  targets: [
    {
      level: "debug",
      target: "pino-pretty", // must be installed separately
    },
    {
      level: "info",
      target: "pino/file",
      options: { destination: "log/pino-info.log", mkdir: true, sync: false },
    },
    {
      level: "error",
      target: "pino/file",
      options: { destination: "log/pino-error.log", mkdir: true, sync: false },
    },
  ],
});

// le
const logger = pino(
  {
    name: "starter",
    level: "debug", // mini global de toutes les targets des transports
    redact: ["secret", "*.secret"], // propriétés des objets qui sont caviardées
  },
  transport,
);

// test du logging pino
logger.trace("verbose trace");
logger.debug("a debug info");
logger.info("an information");
logger.warn("a warning");
logger.error("an error, critical");
logger.fatal("you DIE");

// info
logger.info(`BOT_ID = ${process.env.BOT_ID}`);
logger.info(`NODE_ENV = ${process.env.NODE_ENV}`);
logger.info(`Node version = ${process.version}`);

// affichage caviardé
logger.debug({ key: 123_456, value: "/tmp", secret: "correcthorsebatterystaple" });

// exemple crypt/génération de nombres
// https://nodejs.org/api/all.html#all_crypto_cryptorandomintmin-max-callback

randomInt(3, (error, n) => {
  if (error) throw error;
  console.log(`Random number chosen from (0, 1, 2): ${n}`);
});

const DELAY = 250; // en ms

// Exemple de fonction génératrice (function*) asynchrone (async) : un range() python async
// https://javascript.info/async-iterators-generators#async-generators-finally
async function* generateSequence(start, end) {
  let result;
  for (let index = start; index <= end; index++) {
    try {
      result = await setTimeout(DELAY, `${index * DELAY}ms`);
    } catch (error) {
      console.debug(error);
    } finally {
      yield result;
    }
  }
}

// boucle for await
async function readSequence() {
  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    console.log(value);
  }
}

console.debug("A");
readSequence();
console.debug("B");

// démo de https://www.nearform.com/blog/using-abortsignal-in-node-js/

const cancelTimeout = new AbortController();
const cancelTask = new AbortController();

async function timeout() {
  try {
    await setTimeout(randomInt(4) * DELAY, undefined, { signal: cancelTimeout.signal });
    console.log("timeout(): aborting");
    cancelTask.abort();
  } catch {
    console.log("timeout(): task finished first");
  }
  console.log("timeout(): ended");
}

async function task() {
  try {
    await setTimeout(randomInt(4) * DELAY, undefined, { signal: cancelTask.signal });
  } catch {
    console.log("task(): timeout finished first");
  } finally {
    cancelTimeout.abort();
  }
  console.log("task(): ended");
}

await Promise.race([timeout(), task()]);

console.debug("C");
