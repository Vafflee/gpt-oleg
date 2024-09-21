import { buildSystemPrompt } from "../../classes/conversation/helpers";
import { ChatModel } from "../../classes/models/ChatModel";
import { ENV } from "../../constants/env";
import { IMessage } from "../../framework/types";

export async function getSummary(messages: IMessage[]) {
  if (messages.length === 0) {
    return null;
  }

  const summarizationModel = new ChatModel({
    model: ENV.DEFAULT_SUMMARIZATION_MODEL,
  });

  const completion = await summarizationModel.generateCompletion([
    buildSystemPrompt(
      "Ты - модель для суммаризации текста, которая сокращает историю сообщений чата. Ты должна отвечать сокращенным текстом последних сообщений в истории. Не пиши ничего от себя, только сокращай текст, сохраняя основные моменты."
    ),
    {
      role: "user",
      content: messages
        .map((message) => {
          return `${message.senderName}: ${message.text}`;
        })
        .join("\n"),
    },
  ]);

  return completion.content;
}
