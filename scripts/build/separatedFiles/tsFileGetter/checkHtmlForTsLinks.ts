import getAllScriptsInHtmlFile from "./getAllScriptsInHtmlFile";

export default function checkHtmlForTsLinks(htmlFiles: string[]): string[] {
  let toReturn: string[] = [];
  htmlFiles.forEach((file) => {
    toReturn = [...toReturn, ...getAllScriptsInHtmlFile(file)];
  });
  return toReturn;
}
