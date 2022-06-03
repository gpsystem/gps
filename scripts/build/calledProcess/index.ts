import { isMainThread } from "node:worker_threads";
import ora from "ora";
import worker from "../builder";
import getOptions from "./getOptions";
import singleBuild from "./singleBuild";
import watcher from "./watcher";

if (isMainThread) {
  const { dev, watch } = getOptions(process.argv);
  const spinner = ora("Starting up...");
  spinner.start();

  if (watch) watcher(dev, spinner);
  else singleBuild(dev, spinner);
} else {
  worker();
}
