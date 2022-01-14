import type { Configuration } from "webpack";
import { resolve, basename, dirname } from "path";
import getDestFromSrc from "../getDestFromSrc";

export default function getWebpackConfig(
  untrustedSrcPath: string,
  dev: boolean
): Configuration {
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
    },
    output: {
      filename: destFileName,
      path: destFilePath,
    },
  };
}
