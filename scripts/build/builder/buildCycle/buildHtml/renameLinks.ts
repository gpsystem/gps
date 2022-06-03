import { dirname, join, relative } from "node:path";
import type { CheerioAPI } from "cheerio";
import { srcDir } from "../../../utils/directories";
import {
  normalizePathToForwardSlash,
  normalizeRelPathToDotSlash,
} from "../../../utils/pathHelpers";
import { newFileNames } from "../newFileNames";

export default async function renameLinks(
  $: CheerioAPI,
  htmlFilePath: string
): Promise<void> {
  // hacky workaround, can't break from loops inside of functions
  const breakingError: Error = new Error("breaking");

  $("[src], [href]").each((_, el) => {
    const attribs: { [key: string]: string | undefined } | undefined =
      $(el).attr();
    if (!attribs) return;
    const { href, src } = attribs;

    for (const [originalRelPath, newRelPath] of newFileNames) {
      const replaceRelPath: (
        attribName: "href" | "src",
        attribValue: string
      ) => void = (attribName, attribValue) => {
        // if the expanded attrib relative path points to the same file as the expanded originalRelPath
        if (
          join(dirname(htmlFilePath), attribValue) ===
          join(srcDir, originalRelPath)
        ) {
          // replace the attrib relative path with the relative path from htmlFilePath to newRelPath
          const newPath: string = normalizeRelPathToDotSlash(
            normalizePathToForwardSlash(
              relative(dirname(htmlFilePath), join(srcDir, newRelPath))
            )
          );
          $(el).attr(attribName, newPath);

          throw breakingError;
        }
      };

      try {
        if (href) {
          replaceRelPath("href", href);
        } else if (src) {
          replaceRelPath("src", src);
        }
      } catch (err) {
        if (err === breakingError) break;
        else throw err;
      }
    }
  });
}
