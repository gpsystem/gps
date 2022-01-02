import { join } from "path";
import type { DirNameStructure } from "./DirNameStructure";
import { getMainDir } from "./getMainDir";

export function getDirNames(): DirNameStructure {
  return {
    mainDir: getMainDir(),
    extensionSourceDir: join(getMainDir(), "src"),
    buildTargetDir: join(getMainDir(), "dist"),
  };
}
