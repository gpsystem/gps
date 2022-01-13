import type { CheerioAPI, Element } from "cheerio";
import buildSingleStyleTag from "./buildSingleStyleTag";

export default async function styleTagBuilds(
  elementList: Element[],
  $: CheerioAPI
): Promise<string[]> {
  return await Promise.all(
    elementList.map(async (el) => buildSingleStyleTag(el, $))
  );
}
