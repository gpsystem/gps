import { normalize } from "node:path";
import { fileURLToPath } from "node:url";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore tsconfig module is set to esnext, this is an incorrect error
const fileName = normalize(fileURLToPath(import.meta.url));
export default fileName;
