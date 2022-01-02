import { join } from "path";

export function getMainDir() {
  return join(__dirname, "..", "..");
}
