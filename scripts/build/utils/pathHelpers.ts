import { relative, join, sep } from "node:path";
import { distDir, srcDir } from "./directories";

/**
 * Normalized the inputted path to use forward slashes only.
 * If a separator isn't inputted, defaults to path.{@link sep}
 *
 * @example
 * ```ts
 * // path.sep = "/"
 * normalizePathToForwardSlash("example/path"); // "example/path"
 * normalizePathToForwardSlash("example\\path"); // "example\\path"
 * normalizePathToForwardSlash("example\\path", "\\"); // "example/path"
 * normalizePathToForwardSlash("example*path", "*"); // "example/path"
 *
 * // path.sep = "\\"
 * normalizePathToForwardSlash("example\\path"); // "example/path"
 * normalizePathToForwardSlash("example/path"); // "example/path"
 * normalizePathToForwardSlash("example\\path"); // "example/path"
 * normalizePathToForwardSlash("example*path", "*"); // "example/path"
 * ```
 */
export const normalizePathToForwardSlash = (
  relPath: string,
  separator?: string | undefined
): string => relPath.split(separator ? separator : sep).join("/");

/**
 * Normalizes the inputted relative path to have ./ in the front if a starter isn't already present.
 *
 * @example
 * ```ts
 * normalizeRelPathToDotSlash("relative/path/to/file.js"); // "./relative/path/to/file.js"
 * normalizeRelPathToDotSlash("../relative/path/to/file.js"); // "../relative/path/to/file.js"
 * normalizeRelPathToDotSlash("./relative/path/to/file.js"); // "./relative/path/to/file.js"
 * ```
 */
export const normalizeRelPathToDotSlash = (relPath: string): string =>
  // "$&" inserts the whole matched string (should be just the first character)
  relPath.replace(/^[a-z]/i, "./$&");

/**
 * Gets the full path of a path in the src dir, moved to the dist directory.
 * Keep in mind that this doesn't change the file extension to a dist version.
 *
 * @example
 * ```ts
 * // on windows
 * getDistPathFromSrcPath("test.json"); // "C:\\Users\\test\\gps\\dist\\test.json"
 *
 * // on linux
 * getDistPathFromSrcPath("test.json"); // "/home/test/gps/test.json"
 * ```
 */
export const getDistPathFromSrcPath = (srcPath: string): string => {
  const srcRelativePath = relative(srcDir, srcPath);
  return join(distDir, srcRelativePath);
};
