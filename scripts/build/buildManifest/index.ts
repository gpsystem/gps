import { existsSync, readJsonSync, writeJsonSync } from "fs-extra";
import getDestFromSrc from "../getDestFromSrc";
import manipulateManifest from "./manipulateManifest";

export default async function buildManifest([manifestLocation]: (
  | string
  | undefined
)[]): Promise<void> {
  if (typeof manifestLocation === "undefined" || !existsSync(manifestLocation))
    return;

  writeJsonSync(
    getDestFromSrc(manifestLocation),
    manipulateManifest(readJsonSync(manifestLocation))
  );
}
