/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import process from "node:process";
import { setInterval } from "node:timers/promises";
import { monitorEventLoopDelay } from "node:perf_hooks";

// pour jouer avec https://nodejs.org/api/perf_hooks.html#perf_hooks_perf_hooks_monitoreventloopdelay_options
const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();

// We are using this single function to handle multiple signals
function handle(signal) {
  console.log(`So the signal which I have Received is: ${signal}`);
  cancelTask.abort();
  //   throw new Error("ERR_SCRIPT_EXECUTION_INTERRUPTED");
}

// on joue pour faire une "fin gracieuse"
process.on("SIGINT", handle);
process.on("SIGTERM", handle);
process.on("SIGHUP", handle);

process.on("beforeExit", (code) => {
  console.log("Process beforeExit event with code:", code);
});

process.on("exit", (code) => {
  console.log("Process exit event with code:", code);
});

console.log("This message is displayed first.");

const doSomeSyncWork = (delay) => {
  const s = Date.now();
  while (true) {
    const array = Array.from({ length: 1000 });
    array.fill("hello");
    if (Date.now() - s > delay) {
      break;
    }
  }
};

console.log("Starting sync job.");
doSomeSyncWork(3000);
console.log("Sync job done.");

const cancelTask = new AbortController();

const interval = 1000;
try {
  // une boucle infinie
  for await (const startTime of setInterval(interval, Date.now(), { signal: cancelTask.signal })) {
    let now = Date.now();
    console.log(startTime, now);
  }
} catch {
  console.log("Task graciously finished.");
}

h.disable();
const pretty = (f) => (f / 10e6).toFixed(3);
console.debug(`min  = ${pretty(h.min)} ms`);
console.debug(`max  = ${pretty(h.max)} ms`);
console.debug(`mean = ${pretty(h.mean)} ms`);
console.debug(`dev  = ${pretty(h.stddev)} ms`);
// console.debug(pretty(h.percentile(50)));
// console.debug(pretty(h.percentile(99)));
// console.log(h.percentiles);

console.log("This message is displayed last.");
