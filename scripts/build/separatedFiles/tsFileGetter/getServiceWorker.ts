import { join, dirname } from "path";
import { existsSync, readJsonSync } from "fs-extra";
import type { ManifestType } from "../../buildManifest/manipulateManifest";
import getMainDir from "../../dirNames/getMainDir";

export default function getServiceWorker(): string | null {
  const manifestFileLink = join(getMainDir(), "src", "manifest.json");
  const rawJson = readJsonSync(manifestFileLink) as ManifestType;

  if (typeof rawJson.background?.service_worker === "undefined") return null;
  const tsLink = rawJson.background.service_worker;

  const contextualizedTsLink = join(dirname(manifestFileLink), tsLink);

  if (!existsSync(contextualizedTsLink))
    throw new Error("Linked service worker does not exist.");
  else return contextualizedTsLink;
}
