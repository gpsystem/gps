import { matchRegexAgainstAllSourceFiles } from "./matchRegexAgainstAllSourceFiles";
import type { SeparatedStructure } from "./SeparatedStructure";

/**
 * Gets the lists of the files in an object
 * @returns A list of the needed
 */
export default function separator(): SeparatedStructure {
  return {
    toCompile: matchRegexAgainstAllSourceFiles(/\.(tsx?|js)$/g),
    toCopy: matchRegexAgainstAllSourceFiles(/\.(png|jpe?g|gif)$/g),
    htmlFiles: matchRegexAgainstAllSourceFiles(/\.html$/g),
    cssFiles: matchRegexAgainstAllSourceFiles(/\.css$/g),
  };
}
