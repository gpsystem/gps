import { join } from "node:path";
import fileName from "./fileName";

export const mainDir: string = join(fileName, "..", "..", "..");

export const srcDir: string = join(mainDir, "src/");

export const distDir: string = join(mainDir, "dist/");
