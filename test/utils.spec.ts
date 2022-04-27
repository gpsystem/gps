import { isObject, payloadCodes } from "@utils/index";

describe("Check for object", () => {
  const nonObjectTestParams = [[], 3, true, new Date(), null, undefined];
  const objectTestParams = [
    {},
    {
      hello: "there",
    },
  ];

  it("returns a boolean", () => {
    [...nonObjectTestParams, ...objectTestParams].forEach((param) => {
      expect(typeof isObject(param)).toBe("boolean");
    });
  });

  it("only returns true for vanilla objects", () => {
    objectTestParams.forEach((param) => {
      expect(isObject(param)).toBe(true);
    });
  });

  it("returns false for all other values", () => {
    nonObjectTestParams.forEach((param) => {
      expect(isObject(param)).toBe(false);
    });
  });
});

describe("payload codes", () => {
  it("is an array", () => {
    const { isArray } = Array;
    expect(isArray(payloadCodes)).toBe(true);
  });

  it("is an array of strings that only contain numbers", () => {
    payloadCodes.forEach((code) => {
      expect(typeof code).toBe("string");
      expect(code).toMatch(/^\d+$/);
    });
  });
});
