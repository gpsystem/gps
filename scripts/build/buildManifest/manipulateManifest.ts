export type ManifestType = {
  background?: {
    service_worker?: string | undefined;
  };
  [key: string]: unknown;
};

export default function manipulateManifest(
  originalManifest: ManifestType
): ManifestType {
  const newManifest: ManifestType = {};
  for (const key in originalManifest) {
    if (Object.prototype.hasOwnProperty.call(originalManifest, key)) {
      if (key === "$schema") continue;
      const element = originalManifest[key];
      newManifest[key] = element;
    }
  }

  if (typeof newManifest.background?.service_worker !== "undefined")
    newManifest.background.service_worker =
      newManifest.background.service_worker.replace(/\.tsx?$/g, ".dist.js");

  return newManifest;
}
