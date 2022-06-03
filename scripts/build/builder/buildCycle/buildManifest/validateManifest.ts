import { createRequire } from "node:module";
import type { Draft07 as Draft07Type } from "json-schema-library";
import fileName from "../../../utils/fileName";
import manifestSchema from "./manifestSchema.json";
import type ManifestType from "./manifestType";

export default function validateManifest(
  manifest: unknown
): manifest is ManifestType {
  const require = createRequire(fileName);
  const {
    Draft07: SchemaValidator,
  }: { Draft07: Draft07Type } = require("json-schema-library");
  // TODO: figure out why ts throws here, file an upstream bug report to TS if needed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore SchemaValidator is a class, incorrect error reported here
  const validator = new SchemaValidator(manifestSchema);

  // json-schema-library source returns a boolean, it's just not documented in the def files
  return validator.isValid(manifest) as boolean;
}
