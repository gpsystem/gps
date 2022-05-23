import type { MessagePort } from "node:worker_threads";
import type { AllMessages } from "../../utils/AllMessages";

export default function getMessageSender(
  parentPort: MessagePort
): (msg: AllMessages) => void {
  return function sendMessageToParent(msg: AllMessages) {
    parentPort.postMessage(msg);
  };
}
