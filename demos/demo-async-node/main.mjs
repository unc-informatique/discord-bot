import dotenv from "dotenv";
// version Promises de setTimeout, celle par défaut étant en callback
import { setTimeout } from "node:timers/promises";
import { randomInt } from "node:crypto";

// exemple d'accès aux variables d'environnement via dotenv
dotenv.config({ debug: true });
console.log(`version = ${process.env.VERSION}`);

// exemple crypt/génération de nombres
// https://nodejs.org/api/all.html#all_crypto_cryptorandomintmin-max-callback

randomInt(3, (error, n) => {
  if (error) throw error;
  console.log(`Random number chosen from (0, 1, 2): ${n}`);
});

const DELAY = 250; // en ms

// Exmeple de fonction génératrice (function*) asynchrone (async) : un range() python async
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
