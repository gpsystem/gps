import type { CheerioAPI } from "cheerio";

export default function transformHtmlTree($: CheerioAPI): CheerioAPI {
  $("script").each((i, el) => {
    const originalSrc = $(el).attr("src");
    originalSrc
      ? $(el).attr("src", originalSrc.replace(/\.tsx?$/, ".dist.js"))
      : void 0;
  });
  $("link").each((i, el) => {
    const originalHref = $(el).attr("href");
    originalHref
      ? $(el).attr("href", originalHref.replace(/\.css$/g, ".dist.css"))
      : void 0;
  });

  return $;
}
