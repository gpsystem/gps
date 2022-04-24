import messageFromObject from "./messageFromObject";
import type { SerializedMessage, UnknownMessage } from "./MessageUtilTypes";
import type { Payloads, payloadCodeUnion } from "@utils/index";
import { isObject } from "@utils/index";

// C stands for code
export default class Message<C extends payloadCodeUnion> {
  /**
   * Turns an input into a Message instance.
   * Returns null if the input is not able to be parsed correctly.
   *
   * @see messageFromObject The implementation.
   * @see isObject Ensures the input is a object before handing off to the implementation.
   */
  static fromObject(obj: unknown): UnknownMessage | null {
    try {
      if (isObject(obj)) return messageFromObject(obj);
      else return null;
    } catch (err) {
      return null;
    }
  }

  constructor(
    private _sender: number,
    private _target: number,
    private _code: C,
    private _payload: Payloads[C]
  ) {}

  /** The ID of the message's sender. */
  get sender() {
    return this._sender;
  }

  /** The ID of the message's intended recipient. */
  get target() {
    return this._target;
  }

  /** The code of the message. */
  get code() {
    return this._code;
  }

  /** The message's payload, excluding the code. */
  get payload() {
    return this._payload;
  }

  /**
   * Serialize into a plain object to be sent.
   */
  public serialize(): SerializedMessage<C> {
    return {
      sender: this.sender,
      target: this.target,
      payload: { ...this.payload, code: this.code },
    };
  }

  /**
   * Construct a response given a code and payload to respond with.
   */
  public createResponse<T extends payloadCodeUnion>(
    responseCode: T,
    responsePayload: Payloads[T]
  ): Message<T> {
    // flips the target and sender with the provided code and payload
    return new Message(this.target, this.sender, responseCode, responsePayload);
  }
}
