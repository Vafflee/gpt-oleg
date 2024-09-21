import {
  ChatCompletionContentPart,
  ChatCompletionMessageParam,
} from "openai/resources";

type BuildMessagesArrayParams = {
  text?: string;
  userName: string;
  imageUrl?: string | null;
  role?: "user" | "assistant";
};

export function buildMessage({
  userName,
  text,
  imageUrl,
  role = "user",
}: BuildMessagesArrayParams): ChatCompletionMessageParam {
  if (role === "assistant") {
    return {
      role,
      content: text,
    };
  }

  const messageContent: ChatCompletionContentPart[] = [];

  if (text) {
    messageContent.push({
      type: "text",
      text: "Говорит " + userName + ": " + text,
    });
  }

  if (imageUrl) {
    messageContent.push({
      type: "image_url",
      image_url: {
        url: imageUrl,
      },
    });
  }

  return {
    role,
    name: userName,
    content: messageContent,
  };
}
