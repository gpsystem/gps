import { existsSync } from "node:fs";
import { join, resolve, extname } from "node:path";
import glob from "glob";
import { srcDir } from "../../utils/directories";
import getServiceWorker from "./getServiceWorker";

export type Paths = {
  binFiles: string[];
  htmlFiles: string[];
  manifestJson: string;
  serviceWorker: string;
};

export default function getPaths(): Paths {
  const sourceFiles: string[] = glob
    .sync("./**/*", {
      cwd: srcDir,
      nodir: true,
    })
    // raw glob matches are relative to srcDir
    .map((val) => resolve(srcDir, val));

  const htmlFiles: string[] = sourceFiles.filter(
    (val) => extname(val) === ".html"
  );
  const manifestJson: string = join(srcDir, "manifest.json");
  if (!existsSync(manifestJson))
    throw new Error("manifest.json does not exist in expected place");
  const serviceWorker: string = getServiceWorker(manifestJson);
  const binFiles: string[] = sourceFiles.filter((val) =>
    [".png", ".jpg", ".gif"].includes(extname(val))
  );

  return { binFiles, htmlFiles, manifestJson, serviceWorker };
}
