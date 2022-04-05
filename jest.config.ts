import { join } from "path";
import type { Config } from "@jest/types";
import { mainDir } from "./scripts/build/dirNames";

const srcFolder = join(mainDir, "src");

const config: Config.InitialOptions = {
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@utils/(.*)": join(srcFolder, "utils/") + "$1",
    "^@message/(.*)": join(srcFolder, "message/") + "$1",
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  resetMocks: true,
  setupFilesAfterEnv: ["./__tests__/jest.setup.js"],
  modulePathIgnorePatterns: ["./__tests__/jest.setup.js"],
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "d.ts", "json", "node"],
};

export default config;
