import { EventEmitter } from "node:events";
import { Worker } from "node:worker_threads";
import type { AllMessages } from "../utils/AllMessages";
import type BuildCycleEvents from "../utils/BuildCycleEvents";
import fileName from "../utils/fileName";

export default function buildCycle(dev: boolean): BuildCycleEvents {
  const worker = new Worker(fileName, { workerData: { dev } });
  const emitter = new EventEmitter();

  worker.addListener("message", (msg: AllMessages) => {
    switch (msg.name) {
      case "done":
        emitter.emit("done");
        break;
      case "message":
        emitter.emit("message", msg.messageCode, msg.stepName);
        break;
      case "warn":
        emitter.emit("warn", msg.warning, msg.stepName);
        break;
      case "error":
        emitter.emit("error", msg.error);
        break;
    }
  });

  return {
    on(eventName, listener) {
      emitter.addListener(eventName, listener);
      return this;
    },
  };
}
