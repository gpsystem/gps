import { resolve } from "path";
import { sync } from "glob";
import { extensionSourceDir as sourceDir } from "../dirNames";

function matchRegexAgainstAllSourceFiles(textRegex: RegExp): string[];
function matchRegexAgainstAllSourceFiles(): string[];
function matchRegexAgainstAllSourceFiles(testRegex?: RegExp): string[] {
  const allSourceFiles = sync(resolve(sourceDir + "/**"), { nodir: true });

  return testRegex
    ? allSourceFiles.filter((value) => testRegex.test(value))
    : allSourceFiles;
}

export default matchRegexAgainstAllSourceFiles;
