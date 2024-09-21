import { IMessage } from "../framework/types";

export const mergeVkMessagesFromSameAuthor = (
  messages: IMessage[]
): IMessage[] => {
  const mergedMessages: IMessage[] = [];
  let lastMessage: IMessage | null = null;

  for (const message of messages) {
    if (lastMessage && lastMessage.senderId === message.senderId) {
      lastMessage.text += `\n${message.text}`;
      lastMessage.attachments.push(...message.attachments);
    } else {
      lastMessage = message;
      mergedMessages.push(message);
    }
  }

  return mergedMessages;
};
