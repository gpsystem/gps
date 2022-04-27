const { join } = require("node:path");

const extensionPath = join(__dirname, "dist");

/** @type {Parameters<typeof import("puppeteer").launch>[0]} */
const launchOptions = {
  // extensions only work in head-full mode
  headless: false,
  devtools: true,
  // load the extension
  args: [
    `--disable-extensions-except=${extensionPath}`,
    `--load-extension=${extensionPath}`,
  ],
};

if (process.env.CI) {
  // chrome will already be installed on CI
  launchOptions.executablePath = process.env.PUPPETEER_EXEC_PATH;
  // For security reasons, chrome is unable to provide a sandbox when it is running in a container-based environment.
  launchOptions.args.push("--no-sandbox");
}

module.exports = { launch: launchOptions };
