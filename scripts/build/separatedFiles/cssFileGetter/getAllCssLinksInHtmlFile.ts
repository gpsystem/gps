import { join, dirname } from "path";
import { load } from "cheerio";
import { readFileSync } from "fs-extra";

export default function getAllCssLinksInHtmlFile(filePath: string): string[] {
  const htmlContent = readFileSync(filePath, "utf-8");
  const $ = load(htmlContent);

  const scriptSrcList = $("link")
    .filter((index, el) => $(el).attr("rel") === "stylesheet")
    .map((index, el) => $(el).attr("href"))
    .get();

  return scriptSrcList.map((relPath) => join(dirname(filePath), relPath));
}
