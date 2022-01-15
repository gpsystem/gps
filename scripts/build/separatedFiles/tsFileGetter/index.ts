import normalizePaths from "../../normalizePaths";
import matchRegexAgainstAllSourceFiles from "../matchRegexAgainstAllSourceFiles";
import checkHtmlForTsLinks from "./checkHtmlForTsLinks";
import getServiceWorker from "./getServiceWorker";

export default function tsFileGetter(): string[] {
  const possibleMatches = normalizePaths(
    matchRegexAgainstAllSourceFiles(/\.tsx?$/g)
  );
  const htmlFiles = normalizePaths(matchRegexAgainstAllSourceFiles(/\.html$/g));
  const allMatches = checkHtmlForTsLinks(htmlFiles);

  const generalTsMatches = possibleMatches.filter((value) =>
    allMatches.includes(value)
  );
  const serviceWorker = getServiceWorker();

  if (serviceWorker === null) return generalTsMatches;

  return [...generalTsMatches, serviceWorker];
}
