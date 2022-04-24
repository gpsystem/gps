import normalizePaths from "../normalizePaths";
import copyHandler from "./copyHandler";

export default async function copyFiles(toCopy: string[]) {
  toCopy = normalizePaths(toCopy);
  await Promise.all(toCopy.map((file) => copyHandler(file)));
}
