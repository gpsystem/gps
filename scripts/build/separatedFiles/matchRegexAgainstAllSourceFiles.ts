import { resolve } from "path";
import { sync } from "glob";
import { extensionSourceDir as sourceDir } from "../dirNames";

export function matchRegexAgainstAllSourceFiles(textRegex: RegExp): string[];
export function matchRegexAgainstAllSourceFiles(): string[];
export function matchRegexAgainstAllSourceFiles(testRegex?: RegExp): string[] {
  const allSourceFiles = sync(resolve(sourceDir + "/**"), { nodir: true });

  return testRegex
    ? allSourceFiles.filter((value) => testRegex.test(value))
    : allSourceFiles;
}
