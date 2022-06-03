import { join } from "node:path";
import { addNewFileName } from "./newFileNames";
import { runWebpack, getWebpackConfig } from "./webpackHelpers";

export default async function buildServiceWorker(
  sendWarning: (warning: Error) => void,
  serviceWorkerPath: string,
  dev: boolean
): Promise<void> {
  const [webpackConfig] = getWebpackConfig(serviceWorkerPath, dev);
  const originalPath = webpackConfig.output!.path!;
  const newPath = join(originalPath, "..");
  const newFilename = "service_worker.dist.js";

  addNewFileName(serviceWorkerPath, join(newPath, newFilename));
  await runWebpack(
    {
      ...webpackConfig,
      output: {
        filename: newFilename,
        path: newPath,
      },
    },
    sendWarning
  );
}
