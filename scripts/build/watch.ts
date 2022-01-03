import { watch } from "chokidar";
import runBuildCycle from "./buildCycle";
import { extensionSourceDir } from "./dirNames";
import { timeFunction } from "./timer";

export default async function runWatch() {
  const [, timeToComplete] = await timeFunction(runBuildCycle);
  console.log(`Initial build complete, took ${timeToComplete}\n`);
  console.log(`Watching ${extensionSourceDir} for changes...\n`);

  const watcher = watch(extensionSourceDir, {
    awaitWriteFinish: true,
    persistent: true,
    ignoreInitial: true,
  });
  watcher
    .on("all", async () => {
      console.log("Changes detected, rebuilding...");
      const [, timeToComplete] = await timeFunction(runBuildCycle);
      console.log(`Rebuilding complete, took ${timeToComplete}\n`);
    })
    .on("error", (err) => {
      throw err;
    });
}
