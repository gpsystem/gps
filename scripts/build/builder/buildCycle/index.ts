import { rm } from "node:fs/promises";
import type { MessagePort } from "node:worker_threads";
import { distDir } from "../../utils/directories";
import buildHtml from "./buildHtml";
import buildManifest from "./buildManifest";
import buildServiceWorker from "./buildServiceWorker";
import copyBinFiles from "./copyBinFiles";
import type { Paths } from "./getPaths";
import getPaths from "./getPaths";
import stepFactory from "./stepFactory";

export default async function buildCycle(
  dev: boolean,
  parentPort: MessagePort
): Promise<void> {
  const step = stepFactory(parentPort);

  await step("Cleaning up before build...", async () => {
    await rm(distDir, { recursive: true, force: true });
  });
  await step("Building extension...", async ({ sendWarning }) => {
    const {
      binFiles: srcBinFiles,
      htmlFiles: srcHtmlFiles,
      manifestJson: srcManifestJson,
      serviceWorker: srcServiceWorker,
    }: Paths = getPaths();

    await Promise.all([
      buildServiceWorker(sendWarning, srcServiceWorker, dev),
      buildHtml(sendWarning, srcHtmlFiles, dev),
      copyBinFiles(srcBinFiles),
    ]);
    await buildManifest(srcManifestJson, dev);
  });
  await step("Finishing up...", async ({ sendMessageToParent }) => {
    sendMessageToParent({
      name: "done",
    });
  });
  /*
  // clear the build dir
  // get all the paths i need
    // files to copy
      // do this first
    // html files
      // html linked css files
      // html linked tsx
      // inline css into html, link to webpack'ed js
    // manifest.json
      // do this last, look for built files and change their names
      // replace built file names
      // remove schema key
    // service worker
      // build with webpack
  */
}
