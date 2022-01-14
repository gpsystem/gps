import { join } from "path";

export default function getMainDir() {
  return join(__dirname, "..", "..", "..");
}
