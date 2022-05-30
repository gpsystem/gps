import chalk from "chalk";
import type { Ora } from "ora";
import type BuildCycleEvents from "../utils/BuildCycleEvents";
import MessageCodes from "../utils/MessageCodes";
import buildCycle from "./builderAdapter";

export default function singleBuild(
  dev: boolean,
  spinner: Ora,
  doNotCloseSpinner?: boolean
): Promise<void> {
  return new Promise<void>((resolve) => {
    const cycle: BuildCycleEvents = buildCycle(dev);
    const warnings: [string, unknown][] = [];

    cycle.on("message", (code, stepName) => {
      switch (code) {
        case MessageCodes.STARTED_STEP:
          spinner.text = stepName;
          break;
      }
    });
    cycle.on("warn", (warning, stepName) => {
      warnings.push([stepName, warning]);
    });
    cycle.on("error", (error) => {
      spinner.fail();
      throw error;
    });
    cycle.on("done", () => {
      spinner.text = "Finished!";
      if (!doNotCloseSpinner) spinner.succeed();

      if (warnings.length) {
        console.log();
        warnings.forEach(([stepName, warning]) => {
          console.log(
            `${chalk.yellow("WARNING")} at step ${chalk.bgGray.whiteBright(
              stepName
            )}\n`
          );
          console.warn(warning);
          console.log();
        });
      }

      resolve();
    });
  });
}
