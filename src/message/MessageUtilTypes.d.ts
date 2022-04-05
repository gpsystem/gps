import type { Payloads, payloadCodeUnion, UnknownObject } from "@utils/index";
import type { Message } from "./Message";

export type UnknownPayload = Payloads[payloadCodeUnion];

export type UnknownMessage = Message<payloadCodeUnion>;

export interface SerializedMessage<T extends payloadCodeUnion>
  // extending by UnknownObject since a serialized message is a vanilla object
  extends UnknownObject,
    Pick<Message<T>, "sender" | "target"> {
  payload: Payloads[T] & { code: T };
}

export type UnknownSerializedMessage = SerializedMessage<payloadCodeUnion>;
