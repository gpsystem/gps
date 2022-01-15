import { rmSync, mkdirSync } from "fs-extra";
import { buildTargetDir } from "./dirNames";

export default function clearBuildDir() {
  rmSync(buildTargetDir, { recursive: true, force: true });
  mkdirSync(buildTargetDir, { recursive: true });
}
