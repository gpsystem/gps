import { readFile, writeFile } from "node:fs/promises";
import { format } from "prettier";
import {
  getDistPathFromSrcPath,
  normalizePathToForwardSlash,
  normalizeRelPathToDotSlash,
} from "../../../utils/pathHelpers";
import { newFileNames } from "../newFileNames";
import type ManifestType from "./manifestType";
import validateManifest from "./validateManifest";

export default async function buildManifest(
  srcManifestJson: string,
  dev: boolean
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { $schema: _, ...manifestContents }: Record<string, unknown> =
    JSON.parse(await readFile(srcManifestJson, "utf-8"));
  if (!validateManifest(manifestContents)) return;
  const modifiedManifestContents: ManifestType =
    replaceManifestLinks(manifestContents);

  await writeFile(
    getDistPathFromSrcPath(srcManifestJson),
    dev
      ? format(JSON.stringify(modifiedManifestContents), { parser: "json" })
      : JSON.stringify(modifiedManifestContents)
  );
}

// thanks to https://www.angularfix.com/2022/01/recursive-find-and-replace-in.html for inspiration
function replaceManifestLinks<T>(objSource: T): T {
  // there are a couple assertions of objSource here
  // there seems to be a problem with narrowing in switch (typeof) statements when generics are involved
  // TODO: figure out why assertions are needed, file an upstream issue to TS if needed
  switch (typeof objSource) {
    case "object":
      if (objSource === null) break;

      if (Array.isArray(objSource)) {
        (objSource as unknown[]) = objSource.map((val) =>
          replaceManifestLinks(val)
        );
      } else if (typeof objSource === "object" && objSource !== null) {
        for (const property in objSource) {
          if (Object.prototype.hasOwnProperty.call(objSource, property)) {
            objSource[property] = replaceManifestLinks(objSource[property]);
          }
        }
      }

      break;
    case "string":
      if (!objSource.includes("/")) break;

      for (const [originalRelativePath, newRelativePath] of newFileNames) {
        const normalizedOriginalRelativePath = normalizeRelPathToDotSlash(
          normalizePathToForwardSlash(originalRelativePath)
        );

        if (normalizedOriginalRelativePath === objSource) {
          (objSource as string) = normalizeRelPathToDotSlash(
            normalizePathToForwardSlash(newRelativePath)
          );
          break;
        }
      }

      break;
  }

  return objSource;
}
