import { join } from "node:path";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-node-externals";

/** @type {import("rollup").RollupOptions} */
const config = {
  input: join(__dirname, "./build/calledProcess/index.ts"),
  output: {
    file: join(__dirname, "./dist/build.mjs"),
    format: "esm",
  },
  plugins: [external(), typescript(), json()],
};

export default config;
