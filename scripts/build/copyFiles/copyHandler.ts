import { copy } from "fs-extra";
import { getDestFromSrc } from "../getDestFromSrc";

export function copyHandler(src: string) {
  return copy(src, getDestFromSrc(src));
}
