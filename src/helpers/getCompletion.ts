import { Conversation } from "../classes/conversation/Conversation";
import { convertBotAppMessagesToModelMessage } from "./convertBotAppMessagesToModelMessage";
import { getDataForCompletionFromContext } from "./prepareDataForCompletion";
import { AsyncReturnType } from "../types";

export async function getCompletion(
  conversation: Conversation,
  {
    userName,
    textToAsk,
    imageUrl,
    lastMessages,
  }: AsyncReturnType<typeof getDataForCompletionFromContext>
) {
  if (imageUrl) {
    return await conversation.askVision({
      userName,
      imageUrl,
      messageToAsk: textToAsk,
      history: convertBotAppMessagesToModelMessage(
        lastMessages.filter((m) => Boolean(m.text))
      ),
    });
  }

  if (textToAsk) {
    return await conversation.ask({
      messageToAsk: textToAsk,
      userName,
      history: convertBotAppMessagesToModelMessage(
        lastMessages.filter((m) => Boolean(m.text))
      ),
    });
  }
}
