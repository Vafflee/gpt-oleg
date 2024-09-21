import { IBotAppContext, AttachmentType, IMessage } from "../framework/types";
import { splitMessages } from "./splitMessages";
import { CtxData } from "../types";

function isForgetCommand(m: IMessage) {
  return m.text?.toLowerCase().trim() === "забудь";
}

function getMessagesAfterLastForgetCommand(messages: IMessage[]) {
  let lastForgetCommandIndex = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (isForgetCommand(messages[i])) {
      lastForgetCommandIndex = i;
      break;
    }
  }
  console.log("lastForgetCommandIndex", lastForgetCommandIndex);

  if (lastForgetCommandIndex === -1) {
    return messages;
  }

  return messages.slice(lastForgetCommandIndex + 1);
}

export async function getDataForCompletionFromContext(
  context: IBotAppContext<CtxData | null>
) {
  const userName = context.message.senderName;
  const textToAsk = context.message.text;
  const imageUrl =
    context.message.attachments?.filter(
      (att) =>
        att.type === AttachmentType.PHOTO || att.type === AttachmentType.STICKER
    )[0]?.url ?? null;

  const { lastMessages } = splitMessages(context.history);

  return {
    userName,
    textToAsk,
    imageUrl,
    lastMessages: getMessagesAfterLastForgetCommand(lastMessages),
  };
}
