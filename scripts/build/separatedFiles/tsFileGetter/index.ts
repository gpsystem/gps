import { normalizePaths } from "../../normalizePaths";
import { matchRegexAgainstAllSourceFiles } from "../matchRegexAgainstAllSourceFiles";
import { checkHtmlForTsLinks } from "./checkHtmlForTsLinks";

export default function tsFileGetter(): string[] {
  const possibleMatches = normalizePaths(
    matchRegexAgainstAllSourceFiles(/\.tsx?$/g)
  );
  const htmlFiles = normalizePaths(matchRegexAgainstAllSourceFiles(/\.html$/g));
  const allMatches = checkHtmlForTsLinks(htmlFiles);

  return possibleMatches.filter((value) => allMatches.includes(value));
}
