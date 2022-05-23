/* eslint-disable import/prefer-default-export */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export async function outputFile(
  filePath: string,
  contents: string
): Promise<void> {
  const fileDir: string = dirname(filePath);

  if (!existsSync(fileDir)) await mkdir(fileDir, { recursive: true });
  await writeFile(filePath, contents, "utf-8");
}
