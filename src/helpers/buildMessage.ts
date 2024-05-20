import { Message } from "../types";

type BuildMessagesArrayParams = {
  text: string;
  userName?: string;
  imageUrl?: string | null;
};

export function buildMessage({
  userName,
  text,
  imageUrl,
}: BuildMessagesArrayParams) {
  const messageContent = [];

  if (text) {
    messageContent.push({
      type: "text",
      text: userName ? `[[senderName=${userName}]] ${text}` : text,
    });
  }
  if (imageUrl) {
    messageContent.push({ type: "image", image_url: imageUrl });
  }

  return {
    role: "user",
    content: messageContent,
  } as Message;
}
