import type { Options } from "html-minifier";

const minifyOptions: Options = {
  // low risk
  caseSensitive: true,
  collapseWhitespace: true,
  removeComments: true,
  // medium risk
  collapseBooleanAttributes: true,
  removeEmptyAttributes: true,
  removeEmptyElements: true,
  // high risk
  decodeEntities: true,
};

export default minifyOptions;
