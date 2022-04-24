/**
 * The content script that actually runs in a GeoFS game tab.
 */
function geoTabWorker(tabId: number): void {
  // inject the api
  // wait for everything to be loaded
  // ask the service worker for all the plugins
  // inject the plugins
}

/**
 * Starts the process of injection. Runs in the background.
 *
 * @param tab The tab to work on.
 *
 * **Precondition:** `tab` is a GeoFS game tab.
 */
export default function startGeoTabProcess(tab: chrome.tabs.Tab): void {
  if (tab.id === undefined) return;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: geoTabWorker,
    args: [tab.id],
  });
}
