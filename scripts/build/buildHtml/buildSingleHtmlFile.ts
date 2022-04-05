import minifyOptions from "./minifyOptions";
import transformHtmlTree from "./transformHtmlTree";
import { load } from "cheerio";
import { minify } from "html-minifier";
import { readFile, outputFile } from "fs-extra";
import getDestFromSrc from "../getDestFromSrc";

export default async function buildSingleHtmlFile(path: string) {
  const newPath = getDestFromSrc(path).replace(/\.html$/, ".dist.html");
  const originalContent = await readFile(path, "utf-8");
  const finalHtml = minify(
    (await transformHtmlTree(load(originalContent))).html(),
    minifyOptions
  );

  await outputFile(newPath, finalHtml, "utf-8");
}
