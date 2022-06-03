import type { ParsedPath } from "node:path";
import { parse, join, resolve, relative } from "node:path";
import type { Configuration } from "webpack";
import webpack from "webpack";
import { distDir, srcDir } from "../../utils/directories";

/** @returns A tuple with the webpack config first, and the destination file path second. */
export function getWebpackConfig(
  sourceFilePath: string,
  dev: boolean
): [Configuration, string] {
  const parsedSourceFile: ParsedPath = parse(sourceFilePath);
  const destFileName: string = parsedSourceFile.base.replace(
    /\.(ts|tsx)$/g,
    ".dist.js"
  );
  const destFileDir: string = resolve(
    distDir,
    relative(srcDir, parsedSourceFile.dir)
  );

  return [
    {
      entry: sourceFilePath,
      mode: dev ? "development" : "production",
      devtool: dev ? "cheap-source-map" : undefined,
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
          "@utils": join(srcDir, "utils/"),
          "@message": join(srcDir, "message/"),
        },
      },
      output: {
        filename: destFileName,
        path: destFileDir,
      },
    },
    join(destFileDir, destFileName),
  ];
}

export async function runWebpack(
  config: Configuration,
  sendWarning: (warning: Error) => void
): Promise<void> {
  const compiler = webpack(config);

  return new Promise<void>((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      if (!stats) return;

      const info = stats.toJson();

      if (stats.hasErrors()) {
        reject(info.errors);
      }

      if (stats.hasWarnings()) {
        for (const warning of info.warnings!) {
          console.log(warning);
          sendWarning(new Error(warning.toString()));
        }
      }

      compiler.close((err) => {
        if (err) reject(err);
        resolve();
      });
    });
  });
}
