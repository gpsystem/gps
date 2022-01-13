import getAllCssLinksInHtmlFile from "./getAllCssLinksInHtmlFile";

export default function checkAllHtmlForCssLinks(htmlFiles: string[]): string[] {
  let toReturn: string[] = [];
  htmlFiles.forEach((file) => {
    toReturn = [...toReturn, ...getAllCssLinksInHtmlFile(file)];
  });

  return toReturn;
}
