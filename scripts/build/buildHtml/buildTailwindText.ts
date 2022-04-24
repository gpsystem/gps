import * as cssnano from "cssnano";
import postcss from "postcss";
import type { AcceptedPlugin } from "postcss";
import * as tailwind from "tailwindcss";

export default async function buildTailwindText(
  originalCss: string
): Promise<string> {
  const postcssConfig: AcceptedPlugin[] = [
    tailwind({
      darkMode: "media",
      theme: {
        extend: {},
      },
    }),
    cssnano(),
  ];

  const buildResult = await postcss(postcssConfig)
    .process(originalCss, {
      from: undefined,
    })
    .then((result) => result.css);

  return buildResult;
}
