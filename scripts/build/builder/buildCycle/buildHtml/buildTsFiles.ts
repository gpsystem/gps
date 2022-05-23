import { dirname, join, relative } from "node:path";
import type { CheerioAPI } from "cheerio";
import { distDir, srcDir } from "../../../utils/directories";
import {
  normalizePathToForwardSlash,
  normalizeRelPathToDotSlash,
} from "../../../utils/pathHelpers";
import { addNewFileName } from "../newFileNames";
import { getWebpackConfig, runWebpack } from "../webpackHelpers";

export default async function buildTsFiles(
  $: CheerioAPI,
  {
    linkedTsFiles,
    htmlFilePath,
    dev,
    sendWarning,
  }: {
    linkedTsFiles: readonly string[];
    htmlFilePath: string;
    dev: boolean;
    sendWarning: (warning: Error) => void;
  }
): Promise<void> {
  await Promise.all(
    linkedTsFiles.map(async (tsFilePath) => {
      const [webpackConfig, tsDestPath] = getWebpackConfig(tsFilePath, dev);
      const htmlDestDir = join(
        distDir,
        relative(srcDir, dirname(htmlFilePath))
      );

      await runWebpack(webpackConfig, sendWarning);
      addNewFileName(tsFilePath, tsDestPath);
      $("script")
        .filter(
          (_, el) =>
            join(dirname(htmlFilePath), $(el).attr("src")!) === tsFilePath
        )
        .each((_, el) => {
          $(el).attr(
            "src",
            normalizeRelPathToDotSlash(
              normalizePathToForwardSlash(relative(htmlDestDir, tsDestPath))
            )
          );
        });
    })
  );
}
