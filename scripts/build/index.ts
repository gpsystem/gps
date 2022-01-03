import clearBuildDir from "./clearBuildDir";
import copyFiles from "./copyFiles";
import fileLists from "./separatedFiles";

clearBuildDir();
copyFiles([...fileLists.manifestJson, ...fileLists.toCopy]);

// build the scripts to .bundle.js files
// build tailwind
// move html links
