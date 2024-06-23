import { MessageContext, VK } from "vk-io";
import { commandsInfoMap } from "../commands/commandsInfoMap";
import { getTextWithoutMentions } from "../helpers/getTextWithoutMentions";

export async function executeCommand(
  context: MessageContext,
  vk: VK,
  next: () => {}
) {
  if (!context.is(["message"])) return;

  const text = getTextWithoutMentions(context);
  const command = Object.values(commandsInfoMap).find((command) =>
    text?.toLowerCase().startsWith(command.word)
  );

  if (!command) {
    return next();
  }

  try {
    command.handler({ context, vk });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return await context.send(`[ Ошибка: ${error.message} ]`);
    }
    await context.send("[ Неизвестная ошибка ]");
  }
}
