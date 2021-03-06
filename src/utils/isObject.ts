import type { UnknownObject } from "./Objects";

/**
 * Checks if obj is a vanilla object.
 * This doesn't include any classes.
 */
export default function isObject(obj: unknown): obj is UnknownObject {
  if (
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    // Check for vanilla object
    Object.prototype.toString() === Object.prototype.toString.call(obj)
  ) {
    return true;
  }
  return false;
}
