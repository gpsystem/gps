import { resolve, sep } from "path";
import { sync } from "glob";
import { extensionSourceDir as sourceDir } from "../dirNames";

function matchRegexAgainstAllSourceFiles(textRegex: RegExp): string[];
function matchRegexAgainstAllSourceFiles(): string[];
function matchRegexAgainstAllSourceFiles(testRegex?: RegExp): string[] {
  // everything has to be a forward slash
  const allSourceFiles = sync(
    resolve(sourceDir + "/**")
      .split(sep)
      .join("/"),
    { nodir: true }
  );

  return testRegex
    ? allSourceFiles.filter((value) => testRegex.test(value))
    : allSourceFiles;
}

export default matchRegexAgainstAllSourceFiles;
