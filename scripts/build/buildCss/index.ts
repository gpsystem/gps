import { normalizePaths } from "../normalizePaths";
import buildSingleCssFile from "./buildSingleCssFile";

export default async function buildCss(untrustedCssPaths: string[]) {
  const cssPaths = normalizePaths(untrustedCssPaths);
  await Promise.all(cssPaths.map((path) => buildSingleCssFile(path)));
}
