import buildCss from "./buildCss";
import buildHtml from "./buildHtml";
import buildManifest from "./buildManifest";
import buildScripts from "./buildScripts";
import clearBuildDir from "./clearBuildDir";
import copyFiles from "./copyFiles";
import fileLists from "./separatedFiles";

export default async function runBuildCycle(dev: boolean) {
  clearBuildDir();
  await Promise.all([
    copyFiles(fileLists.toCopy),
    buildScripts(fileLists.toCompile, dev),
    buildCss(fileLists.cssFiles),
    buildHtml(fileLists.htmlFiles),
    buildManifest(fileLists.manifestJson),
  ]);
}
