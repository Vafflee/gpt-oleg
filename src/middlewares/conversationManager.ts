import { MessageContext } from "vk-io/lib/structures";
import { Conversation } from "../classes/conversation/Conversation";

export async function conversationManager(
  context: MessageContext,
  next: () => {}
) {
  if (!context.is(["message"])) return;

  const conversationId = context.conversation?.id ?? context.senderId;

  const conversation = await Conversation.loadOrCreate(conversationId);

  context.conversation = conversation;
  return next();
}
