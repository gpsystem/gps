import { resolve } from "path";
import { sync } from "glob";
import { extensionSourceDir as sourceDir } from "../dirNames";

export default function matchRegexAgainstAllSourceFiles(
  textRegex: RegExp
): string[];
export default function matchRegexAgainstAllSourceFiles(): string[];
export default function matchRegexAgainstAllSourceFiles(
  testRegex?: RegExp
): string[] {
  const allSourceFiles = sync(resolve(sourceDir + "/**"), { nodir: true });

  return testRegex
    ? allSourceFiles.filter((value) => testRegex.test(value))
    : allSourceFiles;
}
