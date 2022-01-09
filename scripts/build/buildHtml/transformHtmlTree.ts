import type { CheerioAPI } from "cheerio";
import buildTailwindText from "./buildTailwindText";

export default async function transformHtmlTree($: CheerioAPI): Promise<CheerioAPI> {
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
  // TODO: this breaks everything help me
  $("style").each((i, el) => {
    if (!($(el).attr("type") === "text/tailwindcss")) return;
    const cssText = $(el).contents().first().text();
    const newCssText = buildTailwindText(cssText);
    process.nextTick(() => {
      console.log(newCssText);
      $(el).replaceWith(`<style>${newCssText}</style>`);
    });
  });

  return $;
}
