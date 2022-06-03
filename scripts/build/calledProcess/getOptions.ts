import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

interface Options {
  dev: boolean;
  watch: boolean;
}

/** Gets the options provided by the user. */
export default function getOptions(argv: string[]): Options {
  const { dev, watch } = yargs(hideBin(argv))
    .option("dev", {
      type: "boolean",
      default: false,
      description: "build in dev mode",
    })
    .option("watch", {
      type: "boolean",
      default: false,
      description: "rebuild on changes",
    })
    .help()
    .parseSync(argv);

  return { dev, watch };
}
