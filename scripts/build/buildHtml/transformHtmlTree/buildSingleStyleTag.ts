import type { CheerioAPI, Element } from "cheerio";
import buildTailwindText from "../buildTailwindText";

export default async function buildSingleStyleTag(
  el: Element,
  $: CheerioAPI
): Promise<string> {
  return `<style>${await buildTailwindText(
    $(el).contents().first().text()
  )}</style>`;
}
