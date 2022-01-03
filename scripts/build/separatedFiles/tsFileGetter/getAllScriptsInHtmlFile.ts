import { join, dirname } from "path";
import * as cheerio from "cheerio";
import { readFileSync } from "fs-extra";

export default function getAllScriptsInHtmlFile(filePath: string): string[] {
  const htmlContent = readFileSync(filePath, "utf-8");
  const $ = cheerio.load(htmlContent);

  const scriptSrcList = $("script")
    .map(function () {
      return $(this).attr("src");
    })
    .get();

  return scriptSrcList.map((relPath) => join(dirname(filePath), relPath));
}
