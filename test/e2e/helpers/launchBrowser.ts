import * as puppeteer from "puppeteer";
import type { Browser } from "puppeteer";
import extensionPath from "./extensionPath";

export default function launchBrowser(): Promise<Browser> {
  const puppeteerOptions: Parameters<typeof puppeteer.launch>[0] = {
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
    puppeteerOptions.executablePath = process.env.PUPPETEER_EXEC_PATH;
    // For security reasons, chrome is unable to provide a sandbox when it is running in a container-based environment.
    puppeteerOptions.args.push("--no-sandbox");
  }

  return puppeteer.launch(puppeteerOptions);
}
