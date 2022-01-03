import { copyHandler } from "./copyHandler";

export function copyFiles(toCopy: string[]) {
  return Promise.all(toCopy.map((file) => copyHandler(file)));
}
