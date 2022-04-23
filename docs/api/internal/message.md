---
name: Messages
---

# Messages

We use an internal system of messages, which are serialized and deserialized from a class that implements everything we could internally need for a message. Messages are meant to be serialized and then passed through the chrome message system.

## Types

#### UnknownPayload

This is a type, and is not accessible at runtime. UnknownPayload describes any [Payload][payloadinterface].

#### UnknownMessage

This is a type, and is not accessible at runtime. UnknownPayload describes any [Message].

#### SerializedMessage<T>

This is an interface, and is not accessible at runtime.

A SerializedMessage contains three properties:

1. `sender`
   - The exact same as [`Message.prototype.sender`][sender].
2. `target`
   - The exact same as [`Message.prototype.target`][target].
3. `payload`
   - [`Message.prototype.code`][code] merged with [`Message.prototype.payload`][payload], with preference to the code.

#### UnknownSerializedMessage

This is a type, and is not accessible at runtime. UnknownSerializedMessage is a [SerializedMessage] of any [Message].

## Message<C>

The Message class implements everything needed to use messages properly. The C property is the code of the message, and is used to narrow the [code][] and [payload][] properties.

#### constructor(sender, target, code, payload)

- sender <[number][]> The ID of the message's sender.
- target <[number][]> The ID of the message's intended recipient.
- code <[payloadCodeUnion][]> The code of the message.
- payload <[Payload][payloadinterface]> The message's payload, excluding the code.

Creates a new Message instance. If you are looking to create a message instance from an unknown input or a known serialized message, use [Message.fromObject][] instead.

```ts
const msg = new Message(-1, 3, "0000", { content: "test" });
```

#### Message.fromObject(obj)

- obj <[unknown][]> The input to create the [Message][] from. Can be anything, as it will be filtered as needed.
- Returns <[Message][] | [null][]> Either a [Message][] instance, or [null][] if a Message instance could not be created from the input.

The Message.fromObject() static method creates an instance of the [Message][] class from an input. The function was built to receive a [SerializedMessage][] that can also have extra parameters. Any other inputs will cause the function to return [null][].

```ts
const { fromObject } = Message;

// all of these return null
fromObject(3);
fromObject(new SomeClass());
fromObject(null);
fromObject(undefined);
fromObject({
  hello: "there",
});

// these will return a Message object
fromObject(someMessage.serialize());
fromObject({
  sender: 0,
  target: 1,
  payload: {
    code: "0000",
  },
  extra: "prop",
});
fromObject({
  sender: 0,
  target: 1,
  payload: {
    code: "0000",
  },
});
```

#### Message.prototype.sender

Message.prototype.sender is a [getter][]. It exposes the internal `_sender` field. The sender field is the ID of the message's sender.

#### Message.prototype.target

Message.prototype.target is a [getter][]. It exposes the internal `_target` field. The target field is the ID of the message's intended recipient.

#### Message.prototype.code

Message.prototype.code is a [getter][]. It exposes the internal `_code` field. The code field is the code of the message.

#### Message.prototype.payload

Message.prototype.payload is a [getter][]. It exposes the internal `_payload` field. The payload field is the message's payload, excluding the code.

#### Message.prototype.serialize()

- Returns <[SerializedMessage][]> The serialized message, ready to be passed to chrome.

Serializes the message, turning it into an [object][unknownobject] to be passed to chrome.

The serialized message can be deserialized by [Message.fromObject][].

```ts
msg.serialize(); // { sender: 0, target: 1, payload: { code: "0000", content: "test" } }
```

#### Message.prototype.createResponse(code, payload)

- code <[payloadCodeUnion][]> The code of the response.
- payload <[Payload][payloadinterface]> The payload of the response.

Creates a response to the message, with the given code and payload.

```ts
msg.serialize(); // { sender: 0, target: 1, payload: { code: "0000", content: "test" } }
const resp = msg.createResponse("0000", { content: "response " });
resp.serialize(); // { sender: 1, target: 0, payload: { code: "0000", content: "response" } }
```

<!-- cspell:disable -->

[message.fromobject]: #messagefromobjectobj
[sender]: #messageprototypesender
[target]: #messageprototypetarget
[code]: #messageprototypecode
[payload]: #messageprototypepayload
[serializedmessage]: #serializedmessage
[message]: #message
[payloadinterface]: ./utils.md#payloads
[payloadcodeunion]: ./utils.md#payloadcodeunion
[unknownobject]: ./utils.md#unknownobject
[getter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
[unknown]: https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown
[null]: https://developer.mozilla.org/en-US/docs/Glossary/Null
[number]: https://developer.mozilla.org/en-US/docs/Glossary/Number
