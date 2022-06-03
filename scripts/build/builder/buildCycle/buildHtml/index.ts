import { readFile } from "node:fs/promises";
import { basename, dirname, join, relative } from "node:path";
import type { CheerioAPI } from "cheerio";
import { load } from "cheerio";
import type { Options as MinifyOptions } from "html-minifier";
import { minify } from "html-minifier";
import { format } from "prettier";
import { distDir, srcDir } from "../../../utils/directories";
import { outputFile } from "../../../utils/fsHelpers";
import { addNewFileName } from "../newFileNames";
import buildCssFiles from "./buildCssFiles";
import buildTsFiles from "./buildTsFiles";
import type { HtmlFileConstants } from "./getHtmlFileConstants";
import getHtmlFileConstants from "./getHtmlFileConstants";
import renameLinks from "./renameLinks";

export default async function buildHtml(
  sendWarning: (warning: Error) => void,
  srcHtmlFiles: string[],
  dev: boolean
): Promise<void> {
  await Promise.all(
    srcHtmlFiles.map((htmlFilePath) =>
      buildHtmlFile(sendWarning, htmlFilePath, dev)
    )
  );
}

async function buildHtmlFile(
  sendWarning: (warning: Error) => void,
  htmlFilePath: string,
  dev: boolean
): Promise<void> {
  const $: CheerioAPI = load(await readFile(htmlFilePath));

  const {
    linkedCssFiles,
    linkedTsFiles,
    tsxFilesToBuildCssFrom,
  }: HtmlFileConstants = await getHtmlFileConstants(htmlFilePath, $);

  await Promise.all([
    buildCssFiles($, {
      linkedCssFiles,
      tsxFilesToBuildCssFrom,
      htmlFilePath,
      dev,
      sendWarning,
    }),
    buildTsFiles($, { linkedTsFiles, htmlFilePath, dev, sendWarning }),
  ]);
  // TODO: make replaceLinks not rely on side effects from the building functions (or find a workaround)
  // Once this is done, move renameLinks into the Promise.all for a performance improvement
  await renameLinks($, htmlFilePath);

  const distFilePath: string = join(
    distDir,
    relative(srcDir, dirname(htmlFilePath)),
    basename(htmlFilePath).replace(/\.html$/, ".dist.html")
  );
  const minifyOptions: MinifyOptions = {
    // low risk
    caseSensitive: true,
    collapseWhitespace: true,
    removeComments: true,
    // medium risk
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    // high risk
    decodeEntities: true,
  };

  await outputFile(
    distFilePath,
    dev ? format($.html(), { parser: "html" }) : minify($.html(), minifyOptions)
  );
  addNewFileName(htmlFilePath, distFilePath);
}
