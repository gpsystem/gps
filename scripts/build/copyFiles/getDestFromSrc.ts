import { resolve } from "path";
import { buildTargetDir, extensionSourceDir } from "../dirNames";

export function getDestFromSrc(src: string) {
  return resolve(resolve(src).replace(extensionSourceDir, buildTargetDir));
}
