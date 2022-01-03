import { copySync } from "fs-extra";
import { getDestFromSrc } from "./getDestFromSrc";

export function copyHandler(src: string) {
  return copySync(src, getDestFromSrc(src));
}
