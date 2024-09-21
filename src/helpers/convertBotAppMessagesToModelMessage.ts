import { ChatCompletionMessageParam } from "openai/resources";
import { IMessage } from "../framework/types";
import { buildMessage } from "./buildMessage";
import {
  getFirstPhotoAttachment,
  getFirstStickerAttachment,
} from "./getFirstAttachmentHelpers";

export const convertBotAppMessagesToModelMessage = (
  messages: IMessage[]
): ChatCompletionMessageParam[] => {
  return messages.map((msg) => {
    return buildMessage({
      userName: msg.senderName,
      text: msg.text,
      imageUrl:
        getFirstPhotoAttachment(msg)?.url ||
        getFirstStickerAttachment(msg)?.url,
      role: msg.isFromBot ? "assistant" : "user",
    });
  });
};
