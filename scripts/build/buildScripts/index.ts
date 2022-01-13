import { normalizePaths } from "../normalizePaths";
import buildSingleScript from "./buildSingleScript";

export default async function buildScripts(toBuild: string[], dev: boolean) {
  toBuild = normalizePaths(toBuild);
  await Promise.all(toBuild.map((path) => buildSingleScript(path, dev)));
}
