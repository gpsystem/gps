import type { CheerioAPI } from "cheerio";

export default function transformHtmlTree($: CheerioAPI): CheerioAPI {
  console.log($);

  return $;
}
