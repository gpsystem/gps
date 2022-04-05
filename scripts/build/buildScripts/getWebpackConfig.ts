import type { Configuration } from "webpack";
import { resolve, basename, dirname, join } from "path";
import getDestFromSrc from "../getDestFromSrc";
import { mainDir } from "../dirNames";

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
