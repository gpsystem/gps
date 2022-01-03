import getAllScriptsInHtmlFile from "./getAllScriptsInHtmlFile";

export function checkHtmlForTsLinks(htmlFiles: string[]): string[] {
  let toReturn: string[] = [];
  htmlFiles.forEach((file) => {
    toReturn = [...toReturn, ...getAllScriptsInHtmlFile(file)];
  });
  return toReturn;
}
