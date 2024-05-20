import { MessageContext } from "vk-io";
import { checkCommands } from "../helpers/checkCommands";

export async function executeCommand(context: MessageContext, next: () => {}) {
  if (!context.is(["message"])) return;

  const commandCompleted = await checkCommands(context, context.conversation);
  if (commandCompleted) return;

  return next();
}
