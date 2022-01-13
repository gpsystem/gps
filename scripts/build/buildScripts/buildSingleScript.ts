import getWebpackConfig from "./getWebpackConfig";
import runWebpack from "./runWebpack";

export default function buildSingleScript(scriptPath: string, dev: boolean) {
  return runWebpack(getWebpackConfig(scriptPath, dev));
}
