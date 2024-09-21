import { IMessage } from "../framework/types";

export function splitMessages(
  messages: IMessage[],
  numberOfLastMessages: number = 20
) {

  if (messages.length <= numberOfLastMessages) {
    return {
      messagesForContext: [],
      lastMessages: messages,
    };
  }

  const lastMessages = messages.slice(-numberOfLastMessages);
  const messagesForContext = messages.slice(0, -numberOfLastMessages);

  return {
    messagesForContext,
    lastMessages,
  };
}
