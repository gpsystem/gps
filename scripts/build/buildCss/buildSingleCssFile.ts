import { dirname } from "path";
import { readFileSync, writeFileSync, mkdirSync } from "fs-extra";
import postcss from "postcss";
import { getDestFromSrc } from "../getDestFromSrc";
import getPostcssConfig from "./getPostcssConfig";

export default async function buildSingleCssFile(path: string) {
  const newPath = getDestFromSrc(path);
  const rawCss = readFileSync(path, "utf-8");
  const compiledCss = await postcss(getPostcssConfig(path)).process(rawCss, {
    from: undefined,
  });
  mkdirSync(dirname(newPath), { recursive: true });
  writeFileSync(newPath, compiledCss.css);
}
