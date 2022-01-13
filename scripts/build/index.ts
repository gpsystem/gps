import * as yargs from "yargs";
import runBuildCycle from "./buildCycle";
import runWatch from "./watch";

const { watch, dev } = yargs
  .option("watch", {
    type: "boolean",
    default: false,
    description: "rebuild on changes",
  })
  .option("dev", {
    type: "boolean",
    default: false,
    description: "build in dev mode",
  })
  .help()
  .parseSync();

watch ? runWatch(dev) : runBuildCycle(dev);
