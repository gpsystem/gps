import { matchPattern } from "browser-extension-url-match";
import startGeoTabProcess from "./startGeoTab";

/** The ID the service worker uses in messages. */
// eslint-disable-next-line import/prefer-default-export
export const messageId = -1;

/** The actual implementation of the worker. */
function worker(): void {
  chrome.action.onClicked.addListener((tab) => {
    if (
      tab.url &&
      matchPattern("https://*.geo-fs.com/geofs.php").match(tab.url)
    ) {
      startGeoTabProcess(tab);
    } else {
      const homePageUrl: string = chrome.runtime.getURL("home/index.dist.html");
      chrome.tabs.create({ url: homePageUrl });
    }
  });
}

worker();
