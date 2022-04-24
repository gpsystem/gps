import { load } from "cheerio";
import { readFile, outputFile } from "fs-extra";
import { minify } from "html-minifier";
import getDestFromSrc from "../getDestFromSrc";
import minifyOptions from "./minifyOptions";
import transformHtmlTree from "./transformHtmlTree";

export default async function buildSingleHtmlFile(path: string) {
  const newPath = getDestFromSrc(path).replace(/\.html$/, ".dist.html");
  const originalContent = await readFile(path, "utf-8");
  const finalHtml = minify(
    (await transformHtmlTree(load(originalContent))).html(),
    minifyOptions
  );

  await outputFile(newPath, finalHtml, "utf-8");
}
