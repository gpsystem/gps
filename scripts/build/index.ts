import * as yargs from "yargs";
import runBuild from "./buildCycle";
import runWatch from "./watch";

const toWatch = yargs
  .option("watch", {
    type: "boolean",
    default: false,
    description: "rebuild on changes",
  })
  .help()
  .parseSync().watch;

toWatch ? runWatch() : runBuild();
