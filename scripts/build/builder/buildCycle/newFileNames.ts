import { relative } from "node:path";
import { distDir, srcDir } from "../../utils/directories";

/** The first in the sub-array should be the original relative path, the second should be the new relative path */
export const newFileNames: [string, string][] = [];

export function addNewFileName(
  originalFilePath: string,
  newFilePath: string
): void {
  const originalFileRelativePath: string = relative(srcDir, originalFilePath);
  const newFileRelativePath: string = relative(distDir, newFilePath);
  newFileNames.push([originalFileRelativePath, newFileRelativePath]);
}
