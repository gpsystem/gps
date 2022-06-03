import { watch } from "chokidar";
import type { Ora } from "ora";
import { srcDir } from "../utils/directories";
import singleBuild from "./singleBuild";

// Not intended to ever return, should run until Ctrl+C
export default async function watcher(
  dev: boolean,
  spinner: Ora
): Promise<void> {
  spinner.text = "Starting first build...";
  await singleBuild(dev, spinner, true);

  let currentlyBuilding = false;
  spinner.text = "Watching source files for changes...";

  watch(srcDir, {
    awaitWriteFinish: true,
    ignoreInitial: true,
    persistent: true,
  }).on("all", async (_, path) => {
    if (currentlyBuilding) return;
    spinner.text = `Changes detected at ${path}, rebuilding...`;
    currentlyBuilding = true;
    await singleBuild(dev, spinner, true);
    spinner.text = "Watching source files for changes...";
    currentlyBuilding = false;
  });
}
