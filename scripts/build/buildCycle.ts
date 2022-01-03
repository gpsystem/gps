import clearBuildDir from "./clearBuildDir";
import copyFiles from "./copyFiles";
import fileLists from "./separatedFiles";

export default async function runBuild() {
  clearBuildDir();
  await Promise.all([
    copyFiles([...fileLists.manifestJson, ...fileLists.toCopy]),
    // TODO: build the scripts to .bundle.js files
    // TODO: build tailwind
    // TODO: move html links
  ]);
}
