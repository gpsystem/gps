import { join } from "path";
import type { InitialOptionsTsJest } from "ts-jest";

export const srcFolder: string = join(__dirname, "src");

const moduleNameMapper: InitialOptionsTsJest["moduleNameMapper"] = {
  "^(\\.{1,2}/.*)\\.js$": "$1",
  "^@utils/(.*)": join(srcFolder, "utils/") + "$1",
  "^@message/(.*)": join(srcFolder, "message/") + "$1",
};

export const commonConfig: InitialOptionsTsJest = {
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.spec.json",
      isolatedModules: true,
    },
  },
  moduleNameMapper,
  clearMocks: true,
  resetMocks: true,
  moduleFileExtensions: ["js", "ts", "tsx", "d.ts", "json", "node"],
};

const config: InitialOptionsTsJest = {
  projects: ["./jest.config.unit.ts", "./jest.config.e2e.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  verbose: true,
};

export default config;
