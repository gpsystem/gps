import type { MessagePort } from "node:worker_threads";
import type { AllMessages } from "../../utils/AllMessages";
import MessageCodes from "../../utils/MessageCodes";
import getMessageSender from "./getMessageSender";

type StepCallback = (helpers: {
  sendWarning(warning: unknown): void;
  sendError(error: Error): void;
  sendMessageToParent(msg: AllMessages): void;
}) => void | Promise<void>;

// food for thought: would it be a good idea to show all currently executing steps
// it would make it a lot easier to see what's going on
export default function stepFactory(
  parentPort: MessagePort
): (name: string, cb: StepCallback) => Promise<void> {
  const sendMessageToParent = getMessageSender(parentPort);

  return async function (stepName, cb) {
    const sendWarning: Parameters<StepCallback>[0]["sendWarning"] = (
      warning: unknown
    ): void => {
      sendMessageToParent({
        name: "warn",
        stepName,
        warning,
      });
    };
    const sendError: Parameters<StepCallback>[0]["sendError"] = (
      error: Error
    ) => {
      sendMessageToParent({
        name: "error",
        stepName,
        error,
      });
    };

    try {
      sendMessageToParent({
        name: "message",
        stepName,
        messageCode: MessageCodes.STARTED_STEP,
      });
      await cb({ sendWarning, sendError, sendMessageToParent });
      sendMessageToParent({
        name: "message",
        stepName,
        messageCode: MessageCodes.FINISHED_STEP,
      });
    } catch (error) {
      const err: Error =
        error instanceof Error ? error : new Error(error as string);

      sendError(err);
      throw err;
    }
  };
}
