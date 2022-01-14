import normalizePaths from "../../normalizePaths";
import matchRegexAgainstAllSourceFiles from "../matchRegexAgainstAllSourceFiles";
import checkAllHtmlForCssLinks from "./checkAllHtmlForCssLinks";

export default function cssFileGetter(): string[] {
  const possibleMatches = normalizePaths(
    matchRegexAgainstAllSourceFiles(/\.css$/g)
  );
  const allMatches = checkAllHtmlForCssLinks(
    normalizePaths(matchRegexAgainstAllSourceFiles(/\.html$/g))
  );

  return possibleMatches.filter((value) => allMatches.includes(value));
}
