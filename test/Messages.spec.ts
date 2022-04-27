import type { SerializedMessage } from "@message/index";
import { Message } from "@message/index";
import { isObject } from "@utils/index";
import type { payloadCodeUnion, Payloads } from "@utils/index";

describe("Messages", () => {
  let msg: Message<"0000">;
  beforeEach(() => {
    msg = new Message(1, 2, "0000", { content: "" });
  });

  // Using ts-ignore comments, i intend runtime errors here
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  it("protects data properties from manipulation", () => {
    expect(() => {
      // @ts-ignore
      msg.sender = "should throw but not cause a failure";
    }).toThrow();

    expect(() => {
      // @ts-ignore
      msg.target = "should throw but not cause a failure";
    }).toThrow();

    expect(() => {
      // @ts-ignore
      msg.code = "should throw but not cause a failure";
    }).toThrow();

    expect(() => {
      // @ts-ignore
      msg.payload = "should throw but not cause a failure";
    }).toThrow();
  });

  it("has get statements that return correct private values", () => {
    // @ts-ignore
    expect(msg.sender).toBe(msg._sender);
    // @ts-ignore
    expect(msg.target).toBe(msg._target);
    // @ts-ignore
    expect(msg.code).toBe(msg._code);
    // @ts-ignore
    expect(msg.payload).toStrictEqual(msg._payload);
  });
  /* eslint-enable @typescript-eslint/ban-ts-comment */

  it("can serialize a message into a vanilla object", () => {
    expect(isObject(msg.serialize())).toBe(true);
  });

  it("can serialize a message into an object with the correct props", () => {
    const serializedMessage: SerializedMessage<"0000"> = msg.serialize();
    const { sender, target, payload } = serializedMessage;

    expect(typeof sender).toBe("number");
    expect(typeof target).toBe("number");
    expect(isObject(payload)).toBe(true);
    expect(typeof payload.code).toBe("string");
  });

  it("can create a response as a message object", () => {
    expect(msg.createResponse("0000", { content: "response" })).toBeInstanceOf(
      Message
    );
  });

  it("creates a response with sender and target flipped", () => {
    const response: Message<"0000"> = msg.createResponse("0000", {
      content: "response",
    });
    expect(response.sender).toBe(msg.target);
    expect(response.target).toBe(msg.sender);
  });

  it("creates a response with the correct code and payload", () => {
    // TODO: change this to a proper response code
    const intendedResponseCode: payloadCodeUnion = "0000";
    const intendedResponsePayload: Payloads["0000"] = { content: "response" };
    const response: Message<"0000"> = msg.createResponse(
      intendedResponseCode,
      intendedResponsePayload
    );

    expect(response.code).toBe(intendedResponseCode);
    expect(response.payload).toStrictEqual(intendedResponsePayload);
  });
});

describe("Message from object", () => {
  const { fromObject } = Message;
  const nonObjectTestParams = [[], 3, true, new Date(), null, undefined];
  const incorrectPropsParams = [
    {},
    {
      hello: "there",
    },
    {
      sender: "test",
    },
    {
      sender: 0,
    },
    {
      sender: 0,
      target: "test",
    },
    {
      sender: 0,
      target: 1,
    },
    {
      sender: 0,
      target: 1,
      payload: "test",
    },
    {
      sender: 0,
      target: 1,
      payload: {},
    },
    {
      sender: 0,
      target: 1,
      payload: {
        code: 2,
      },
    },
  ];
  const extraPropsParam = {
    sender: 0,
    target: 1,
    payload: {
      code: "0000",
    },
    extra: "prop",
  };
  const msg: Message<"0000"> = new Message(1, 2, "0000", { content: "" });
  const perfectMessageParam: SerializedMessage<"0000"> = msg.serialize();

  it("never returns undefined", () => {
    const allParams = [
      ...nonObjectTestParams,
      ...incorrectPropsParams,
      extraPropsParam,
      perfectMessageParam,
    ];

    allParams.forEach((param) => {
      expect(fromObject(param)).toBeDefined();
    });
  });

  it("returns null for all non-object params", () => {
    nonObjectTestParams.forEach((param) => {
      expect(fromObject(param)).toBeNull();
    });
  });

  it("returns null for objects params without the correct props", () => {
    incorrectPropsParams.forEach((param) => {
      expect(fromObject(param)).toBeNull();
    });
  });

  it("doesn't return null for params with extra props", () => {
    expect(fromObject(extraPropsParam)).not.toBeNull();
  });

  it("returns a message object with correct parameters", () => {
    const newMsg = fromObject(perfectMessageParam);
    expect(newMsg).not.toBeNull();

    // this isn't actually needed, but typescript doesn't do narrowing from an expect assertion
    if (newMsg === null)
      throw new Error("Something went wrong with the above assertion");

    expect(newMsg.sender).toBe(msg.sender);
    expect(newMsg.target).toBe(msg.target);
    expect(newMsg.code).toBe(msg.code);
    expect(newMsg.payload).toStrictEqual(msg.payload);
  });
});
