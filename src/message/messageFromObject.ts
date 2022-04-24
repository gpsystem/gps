import Message from "./Message";
import type {
  UnknownMessage,
  UnknownPayload,
  UnknownSerializedMessage,
} from "./MessageUtilTypes";
import { isObject, payloadCodes } from "@utils/index";
import type { payloadCodeUnion, UnknownObject } from "@utils/index";

function validateObjectHasProps(
  obj: UnknownObject
): obj is UnknownSerializedMessage {
  if (
    typeof obj.sender === "number" &&
    typeof obj.target === "number" &&
    isObject(obj.payload) &&
    typeof obj.payload.code === "string" &&
    // have to widen the type of payloadCodes to run .includes without type errors
    (payloadCodes as readonly string[]).includes(obj.payload.code)
  )
    return true;
  return false;
}

function getPropsFromSerializedMessage(msg: UnknownSerializedMessage): {
  sender: number;
  target: number;
  code: payloadCodeUnion;
  payload: UnknownPayload;
} {
  const { sender, target } = msg;
  const { code, ...payload } = msg.payload;
  return {
    sender,
    target,
    code,
    payload,
  };
}

/**
 * Turns an object into a Message instance.
 * Returns null if the object is not able to be parsed correctly.
 */
export default function messageFromObject(
  obj: UnknownObject
): UnknownMessage | null {
  if (!validateObjectHasProps(obj)) return null;
  const { sender, target, code, payload } = getPropsFromSerializedMessage(obj);
  return new Message(sender, target, code, payload);
}
