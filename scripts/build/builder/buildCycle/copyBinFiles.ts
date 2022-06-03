import { existsSync } from "node:fs";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { distDir } from "../../utils/directories";
import { addNewFileName } from "./newFileNames";

export default async function copyBinFiles(
  srcBinFiles: string[]
): Promise<void> {
  if (srcBinFiles.length === 0) return;

  const distBinDir: string = join(distDir, "bin/");
  await mkdir(distBinDir, { recursive: true });

  for (const srcBinFile of srcBinFiles) {
    const srcFileName: string = basename(srcBinFile);
    let newFileName = srcFileName;
    let expandedNewFileName: string = join(distBinDir, newFileName);
    let appendedNumber = 0;
    while (existsSync(expandedNewFileName)) {
      const lastAppendedNumber = appendedNumber;
      appendedNumber++;
      const splitNewFileName: string[] = newFileName.split(".");
      if (newFileName === srcFileName) {
        splitNewFileName[0] += String(appendedNumber);
      } else {
        splitNewFileName[0] =
          splitNewFileName[0].substring(
            0,
            splitNewFileName[0].lastIndexOf(String(lastAppendedNumber))
          ) + String(appendedNumber);
      }
      newFileName = splitNewFileName.join(".");
      expandedNewFileName = join(distBinDir, newFileName);
    }

    await writeFile(expandedNewFileName, await readFile(srcBinFile));
    addNewFileName(srcBinFile, expandedNewFileName);
  }
}
