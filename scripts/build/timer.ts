// adapted from https://stackoverflow.com/a/14551263

export function getTimeHandler() {
  let start = process.hrtime();

  const getElapsedTime = () => {
    const precision = 3;
    const elapsed = process.hrtime(start)[1] / 1000000;
    const toReturn =
      process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms";
    start = process.hrtime();
    return toReturn;
  };

  return getElapsedTime;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export async function timeFunction<T>(
  cb: () => T
): Promise<[Awaited<T>, string]> {
  const getElapsedTime = getTimeHandler();
  const toReturn = await cb();
  const elapsedTime = getElapsedTime();
  return [toReturn, elapsedTime];
}
