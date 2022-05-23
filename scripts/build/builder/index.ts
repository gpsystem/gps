import { parentPort, workerData } from "node:worker_threads";
import buildCycle from "./buildCycle";

// This is assumed to be called as a worker of ../calledProcess/index.ts
export default function worker() {
  const { dev }: { dev: unknown } = workerData;

  if (typeof dev === "boolean") {
    // parentPort will always be defined if this is a worker
    buildCycle(dev, parentPort!);
  }
}
