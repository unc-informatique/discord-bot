/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import process from "node:process";
import { setInterval } from "node:timers/promises";

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

console.log("This message is displayed last.");
