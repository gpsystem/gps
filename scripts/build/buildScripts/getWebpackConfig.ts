import { resolve, basename, dirname, join } from "path";
import type { Configuration } from "webpack";
import { mainDir } from "../dirNames";
import getDestFromSrc from "../getDestFromSrc";

export default function getWebpackConfig(
  untrustedSrcPath: string,
  dev: boolean
): Configuration {
  const srcFolder = join(mainDir, "src");
  const srcFile = resolve(untrustedSrcPath);
  const destFileName = basename(srcFile).replace(/\.(ts|tsx)$/g, ".dist.js");
  const destFilePath = resolve(dirname(getDestFromSrc(srcFile)));

  return {
    entry: srcFile,
    mode: dev ? "development" : "production",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@utils": join(srcFolder, "utils/"),
        "@message": join(srcFolder, "message/"),
      },
    },
    output: {
      filename: destFileName,
      path: destFilePath,
    },
  };
}
