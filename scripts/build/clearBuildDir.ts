import { rmSync } from "fs-extra";
import { buildTargetDir } from "./dirNames";

export default function clearBuildDir() {
  rmSync(buildTargetDir, { recursive: true, force: true });
}
