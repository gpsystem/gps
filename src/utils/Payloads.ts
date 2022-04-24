import type { EmptyObject } from "./Objects";

// Maintainers: When adding codes, add them to the Payloads interface and the codes array

export const payloadCodes = ["0000", "0001", "1000", "1001"] as const;

/**
 * The types of all the payloads, indexed by the message codes to be used when they are used as payloads.
 * All the types here should be objects.
 * Any types that declare a `code` value will have it overridden by the message code.
 */
export interface Payloads {
  "0000": {
    content: string;
  };
  "0001": EmptyObject;
  "1000": {
    content: string;
  };
  "1001": {
    id: number;
  };
}

/** The union of all the possible codes a payload can be. */
export type payloadCodeUnion = typeof payloadCodes[number];
