import { resolve } from "path";

export function normalizePaths(pathsList: string[]) {
  return pathsList.map((path) => resolve(path));
}
