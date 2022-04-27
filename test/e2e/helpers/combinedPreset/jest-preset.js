const puppeteerPreset = require("jest-puppeteer/jest-preset");
const tsPreset = require("ts-jest/presets/default-esm/jest-preset");

module.exports = { ...tsPreset, ...puppeteerPreset };
