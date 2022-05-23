import { dirname, resolve } from "node:path";
import type { CheerioAPI } from "cheerio";
import madge from "madge";

export type HtmlFileConstants = {
  linkedCssFiles: readonly string[];
  linkedTsFiles: readonly string[];
  tsxFilesToBuildCssFrom: readonly string[];
};

export default async function getHtmlFileConstants(
  htmlFilePath: string,
  $: CheerioAPI
): Promise<HtmlFileConstants> {
  const linkedCssFiles: string[] = [
    ...new Set(
      $("link")
        .filter((_, el) => $(el).attr("rel") === "stylesheet")
        .map((_, el) => resolve(dirname(htmlFilePath), $(el).attr("href")!))
        .get()
        .filter(Boolean)
    ),
  ];
  const linkedTsFiles: string[] = [
    ...new Set(
      $("script")
        .map((_, el) => resolve(dirname(htmlFilePath), $(el).attr("src")!))
        .get()
        .filter(Boolean)
    ),
  ];
  const tsxFilesToBuildCssFrom: string[] = await (async () => {
    const tsxFilesToBuildCssFrom: string[] = [];

    await Promise.all(
      linkedTsFiles.map(async (tsFilePath) => {
        if (!/\.tsx$/.test(tsFilePath)) return;

        const madgeInstance = await madge(tsFilePath, {
          tsConfig: "./tsconfig.json",
          detectiveOptions: {
            ts: { skipTypeImports: true },
          },
        });
        const paths: string[] = [];
        const tree = madgeInstance.obj();

        for (const element of Object.values(tree)) {
          element.forEach((val) => {
            if (/\.tsx$/g.test(val))
              paths.push(resolve(dirname(tsFilePath), val));
          });
        }
        tsxFilesToBuildCssFrom.push(tsFilePath, ...paths);
      })
    );

    return [...new Set(tsxFilesToBuildCssFrom)];
  })();

  return { linkedCssFiles, linkedTsFiles, tsxFilesToBuildCssFrom };
}
