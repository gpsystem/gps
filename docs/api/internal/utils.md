# Utils

#### Payloads

Payloads is an interface, and is not accessible at runtime. It defines all the potential codes of messages, and the type their payloads must adhere to. The types are all objects, and never contain the key "code", as it is overwritten in the passing of the message.

Here are all the payload codes with their descriptions.

| Code | Description                                                                              |
| ---- | ---------------------------------------------------------------------------------------- |
| 0000 | A test code.                                                                             |
| 0001 | Asking the background service worker what the id of the sender is. Sender id must be -2. |
| 1000 | A test response code.                                                                    |
| 1001 | The service worker's response to code 0001.                                              |

#### payloadCodeUnion

payloadCodeUnion is a type, and is not accessible at runtime. It is simply the union of all the codes defined in [payloadCodes][].

```ts
const code: payloadCodeUnion = "0000"; // No errors
const notACode: payloadCodeUnion = 3; // ERROR: number is not assignable to payloadCodeUnion
```

#### UnknownObject

UnknownObject is a type, and is not accessible at runtime. Anything assignable to this type is a vanilla JS object.

```ts
const obj: UnknownObject = { foo: "bar" }; // No errors
const notAnObj: UnknownObject = [1, 2, 3]; // ERROR: number[] is not assignable to UnknownObject
```

#### payloadCodes

payloadCodes is an array of all the codes defined in [Payloads][].

#### isObject(obj)

- `obj` <[unknown][]> The object to check.
- Returns: <[boolean][]> Whether the `obj` parameter is only an object of the [Object][] class.

isObject() checks if an object is assignable to [UnknownObject][]. It takes one parameter, which may be of any type, and returns a boolean value that asserts whether the input is a plain JS object.

```ts
// all of these will evaluate to false
isObject([]);
isObject(3);
isObject(new SomeClass());
isObject("foo");

// all of these will evaluate to true
isObject({});
isObject({
  foo: "bar",
});
```

<!-- cspell:disable -->

[unknown]: https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown
[boolean]: https://developer.mozilla.org/en-US/docs/Glossary/Boolean
[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[payloadcodes]: #payloadcodes
[payloads]: #payloads
[unknownobject]: #unknownobject
