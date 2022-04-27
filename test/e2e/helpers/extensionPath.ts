import { join } from "node:path";
import { mainDir } from "../../../scripts/build/dirNames";

const extensionPath: string = join(mainDir, "dist/");

export default extensionPath;
