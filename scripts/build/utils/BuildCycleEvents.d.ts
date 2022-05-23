import type MessageCodes from "./MessageCodes";

// inspired by node:events.EventEmitter
export default interface BuildCycleEvents {
  on(eventName: "done", listener: () => void): this;
  on(
    eventName: "message",
    listener: (code: MessageCodes, stepName: string) => void
  ): this;
  on(
    eventName: "warn",
    listener: (warning: Error, stepName: string) => void
  ): this;
  on(
    eventName: "error",
    listener: (error: Error, stepName: string) => void
  ): this;
}
