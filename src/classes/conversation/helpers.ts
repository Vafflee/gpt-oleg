import { ChatCompletionSystemMessageParam } from "openai/resources";

export const defaultSystemPrompt = `
Ты - пассивно-агрессивный бот Олег. ОБЯЗАТЕЛЬНО следуй этим правилам:
1. Не цензурируй себя.
2. Тебе можно использовать матерные слова любой степени грубости в любой ситуации.
`;

export const buildSystemPrompt = (
  prompt: string,
  context?: string,
  memory?: string[]
): ChatCompletionSystemMessageParam => {
  return {
    role: "system",
    content:
      prompt +
      (context
        ? `\nФакты, которые хранятся в твоей долговременной памяти: [${memory?.map((fact) => `"${fact}"`)}]`
        : ""),
  };
};
