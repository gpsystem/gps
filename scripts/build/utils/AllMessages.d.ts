import type MessageCodes from "./MessageCodes";

export type AllMessages =
  | {
      name: "done";
    }
  | {
      name: "message";
      stepName: string;
      messageCode: MessageCodes;
    }
  | {
      name: "error";
      error: Error;
      stepName: string;
    }
  | {
      name: "warn";
      warning: Error;
      stepName: string;
    };
