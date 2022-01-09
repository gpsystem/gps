import buildCss from "./buildCss";
import buildScripts from "./buildScripts";
import clearBuildDir from "./clearBuildDir";
import copyFiles from "./copyFiles";
import buildHtml from "./buildHtml";
import fileLists from "./separatedFiles";

export default async function runBuildCycle(dev: boolean) {
  clearBuildDir();
  await Promise.all([
    copyFiles([...fileLists.manifestJson, ...fileLists.toCopy]),
    buildScripts(fileLists.toCompile, dev),
    buildCss(fileLists.cssFiles),
    buildHtml(fileLists.htmlFiles),
    // TODO: handle manifest.json
  ]);
}
