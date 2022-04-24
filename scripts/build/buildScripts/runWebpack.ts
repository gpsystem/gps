import * as webpack from "webpack";

export default function runWebpack(config: webpack.Configuration) {
  const compiler = webpack(config);

  return new Promise<void>((resolve, reject) => {
    try {
      compiler.run((err, stats) => {
        if (err) {
          reject(err.stack || err);
          return;
        }

        const info = stats?.toJson();

        if (stats?.hasWarnings()) {
          console.warn(info?.warnings);
        }

        if (stats?.hasErrors()) {
          reject(info?.errors);
        }
      });

      compiler.close((closeErr) => {
        if (closeErr) {
          reject(closeErr);
        }
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}
