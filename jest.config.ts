import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      useESM: true,
      diagnostics: {
        ignoreCodes: [ 'TS151001' ],
      },
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  resetMocks: true,
  setupFilesAfterEnv: ["./__tests__/jest.setup.js"],
  modulePathIgnorePatterns: ["./__tests__/jest.setup.js"],
  // TODO: remove this when adding a test suite
  passWithNoTests: true,
};

export default config;
