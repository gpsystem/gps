import postcss from "postcss";
import getPostcssConfig from "./getPostcssConfig";

export default function buildSingleCssFile(path: string) {
  postcss(getPostcssConfig(path));
}
