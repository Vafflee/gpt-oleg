import { ChatCompletionMessage, ChatModel } from "openai/resources";
import { ConversationHistory, Model } from "../types";
import { ai } from "./ai";

export async function generateCompletion(history: ConversationHistory, model: string) {
  console.log(history);
  console.log(model);
  
  const completion = await ai.chat.completions.create({
    model: model,
    messages: history as unknown as ChatCompletionMessage[],
  })
  return completion.choices[0].message
} 
