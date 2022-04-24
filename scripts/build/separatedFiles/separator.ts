import cssFileGetter from "./cssFileGetter";
import matchRegexAgainstAllSourceFiles from "./matchRegexAgainstAllSourceFiles";
import type { SeparatedStructure } from "./SeparatedStructure";
import tsFileGetter from "./tsFileGetter";

/**
 * Gets the lists of the files in an object
 * @returns A list of the source files, organized by their needed actions.
 */
export default function separator(): SeparatedStructure {
  return {
    toCompile: tsFileGetter(),
    toCopy: matchRegexAgainstAllSourceFiles(/\.(png|jpe?g|gif)$/g),
    htmlFiles: matchRegexAgainstAllSourceFiles(/\.html$/g),
    cssFiles: cssFileGetter(),
    manifestJson: matchRegexAgainstAllSourceFiles(/manifest\.json$/g),
  };
}
