import { Conversation } from "../classes/conversation/Conversation";
import { IMiddleware } from "../framework/types";
import { CtxData } from "../types";

export const conversationManager: IMiddleware<CtxData | null> = async (
  context,
  next
) => {
  const conversationId =
    context.additionalData?.conversation?.id ?? context.message.conversationId;

  const conversation = await Conversation.loadOrCreate(conversationId);

  context.additionalData = {
    ...context.additionalData,
    conversation,
  };

  next();
};
