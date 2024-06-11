import { MessageContext } from "vk-io/lib/structures";
import { buildMessage } from "../helpers/buildMessage";
import { getUserName } from "../helpers/getUserName";
import { VK } from "vk-io";

export async function findAndSetForwardMessages(
  context: MessageContext,
  next: () => {},
  vk: VK
) {
  context.forwardedMessages = null;

  if (!context.is(["message"])) return;
  if (!context.hasForwards && !context.hasReplyMessage) return next();

  await context.loadMessagePayload();

  const messages = [...context.forwards];
  if (context.replyMessage) messages.push(context.replyMessage);

  const messagesForCompletion = await Promise.all(
    messages.map(async (message) => {
      if (message.senderType === "group") {
        return buildMessage({
          userName: "",
          text: message.text ?? "",
          role: "assistant",
        });
      };

      const userName = await getUserName(vk, context);
      return buildMessage({
        userName,
        text: message.text ?? "",
        role: 'user',
      });
    })
  );

  context.forwardedMessages = messagesForCompletion;

  return next();
}
