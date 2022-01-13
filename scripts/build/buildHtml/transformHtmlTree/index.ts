import type { CheerioAPI, Element } from "cheerio";
import styleTagBuilds from "./styleTagBuilds";

export default async function transformHtmlTree(
  $: CheerioAPI
): Promise<CheerioAPI> {
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

  // a workaround, since .each callbacks are synchronous
  const styleElementList: Element[] = [];
  $("style").each((i, el) => {
    $(el).attr("type") === "text/tailwindcss"
      ? styleElementList.push(el)
      : void 0;
  });
  const builtStyleElementList = await styleTagBuilds(styleElementList, $);
  $("style").remove();
  builtStyleElementList.forEach((val) => {
    $("head").append(val);
  });

  return $;
}
