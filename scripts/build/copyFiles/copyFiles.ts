import { copyHandler } from "./copyHandler";
import { normalizePaths } from "../normalizePaths";

export async function copyFiles(toCopy: string[]) {
  toCopy = normalizePaths(toCopy);
  await Promise.all(toCopy.map((file) => copyHandler(file)));
}
