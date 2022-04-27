import type { InitialOptionsTsJest } from "ts-jest";
import { commonConfig } from "./jest.config";

const config: InitialOptionsTsJest = {
  ...commonConfig,
  testMatch: ["**/test/**/*.spec.ts", "!**/test/e2e/**"],
};

export default config;
