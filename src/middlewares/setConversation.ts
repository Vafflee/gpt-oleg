import { MessageContext } from "vk-io/lib/structures";
import { db } from "../db/db";
import { Conversation } from "../classes/conversation";
import { SerializedConversation } from "../types";

export async function setConversation(context: MessageContext, next: () => {}) {
  if (!context.is(["message"])) return;

  const conversationId = context.conversation?.id ?? context.senderId;

  const conversationData = await db.getObjectDefault("/conversations/" + conversationId) as SerializedConversation | null;
  let conversation: Conversation;
  if (!conversationData) {
    conversation = new Conversation({ id: conversationId });
    await db.push("/conversations/" + conversationId, conversation);
  } else {
    conversation = new Conversation(conversationData);
  }

  context.conversation = conversation;
  return next();
}