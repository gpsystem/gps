import { normalizePaths } from "../normalizePaths";
import buildSingleHtmlFile from "./buildSingleHtmlFile";

export default async function buildHtml(untrustedHtmlPaths: string[]) {
  const htmlPaths = normalizePaths(untrustedHtmlPaths);
  await Promise.all(htmlPaths.map((path) => buildSingleHtmlFile(path)));
}
