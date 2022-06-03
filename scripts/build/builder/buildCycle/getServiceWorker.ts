import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

export default function getServiceWorker(manifestJson: string): string {
  const fileLink: string | undefined = JSON.parse(
    readFileSync(manifestJson, "utf-8")
  ).background?.service_worker;

  if (typeof fileLink !== "string")
    throw new Error("manifest does not declare a proper service worker link");
  return resolve(dirname(manifestJson), fileLink);
}
