import { resolve } from "node:path";
import type { InitialOptionsTsJest } from "ts-jest";
import { commonConfig } from "./jest.config";

const config: InitialOptionsTsJest = {
  ...commonConfig,
  // use the custom preset (just merges jest-puppeteer and ts-jest)
  preset: resolve("./test/e2e/helpers/combinedPreset"),
  testMatch: ["**/test/e2e/**/*.spec.ts"],
  detectOpenHandles: true,
};

export default config;
