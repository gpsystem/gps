import cssFileGetter from "./cssFileGetter";
import tsFileGetter from "./tsFileGetter";
import { matchRegexAgainstAllSourceFiles } from "./matchRegexAgainstAllSourceFiles";
import type { SeparatedStructure } from "./SeparatedStructure";

/**
 * Gets the lists of the files in an object
 * @returns A list of the source files, organized by their needed actions.
 */
export default function separator(): SeparatedStructure {
  const toCompile = tsFileGetter();
  const cssFiles = cssFileGetter();
  return {
    toCompile,
    toCopy: matchRegexAgainstAllSourceFiles(/\.(png|jpe?g|gif)$/g),
    htmlFiles: matchRegexAgainstAllSourceFiles(/\.html$/g),
    cssFiles,
    manifestJson: matchRegexAgainstAllSourceFiles(/manifest\.json$/g),
  };
}
