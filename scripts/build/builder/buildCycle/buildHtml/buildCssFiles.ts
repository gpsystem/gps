import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { CheerioAPI } from "cheerio";
import cssnano from "cssnano";
import type { AcceptedPlugin } from "postcss";
import postcss from "postcss";
import tailwindcss from "tailwindcss";

export default async function buildCssFiles(
  $: CheerioAPI,
  {
    linkedCssFiles,
    tsxFilesToBuildCssFrom,
    htmlFilePath,
    dev,
    sendWarning,
  }: {
    linkedCssFiles: readonly string[];
    tsxFilesToBuildCssFrom: readonly string[];
    htmlFilePath: string;
    dev: boolean;
    sendWarning: (warning: Error) => void;
  }
): Promise<void> {
  await Promise.all(
    linkedCssFiles.map(async (cssFilePath) => {
      const postcssConfig: AcceptedPlugin[] = [
        tailwindcss({
          content: tsxFilesToBuildCssFrom as string[],
          darkMode: "media",
          theme: {},
        }),
        ...(dev ? [] : [cssnano()]),
      ];

      const result = await postcss(postcssConfig).process(
        await readFile(cssFilePath, "utf-8"),
        { from: cssFilePath }
      );
      if (result.warnings().length) {
        result.warnings().forEach((warning) =>
          sendWarning({
            ...warning,
            name: "PostCSS warning",
            message: warning.text,
          })
        );
      }
      $("link")
        .filter(
          (_, el) =>
            $(el).attr("rel") === "stylesheet" &&
            join(dirname(htmlFilePath), $(el).attr("href")!) === cssFilePath
        )
        .each((_, el) => {
          $(el).remove();
        });
      $("head").append(`<style>${result.css}</style>`);
    })
  );
}
