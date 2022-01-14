import { resolve } from "path";

export default function normalizePaths(pathsList: string[]) {
  return pathsList.map((path) => resolve(path));
}
