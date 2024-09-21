import { ChatCompletionMessageParam } from "openai/resources";
import { Conversation } from "./classes/conversation/Conversation";

export enum Model {
  geminiFlash = "google/gemini-flash-1.5",
  claudeHaiku = "anthropic/claude-3-haiku",
  gpt4o = "openai/gpt-4o",
  gpt4ovision = "vis-openai/gpt-4o",
  gpt35turbo = "openai/gpt-3.5-turbo-0125",
  llama4lumimaid = "neversleep/llama-3-lumimaid-8b-large",
  geminiProVision = "vis-google/gemini-pro-1.5",
  geminiFlashVision = "vis-google/gemini-flash-1.5",
  transcription = "stt-openai/whisper-1",
  dallE3 = "openai/dall-e-3",
  dallE2 = "openai/dall-e-2",
}

export type CtxData = {
  conversation: Conversation;
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
    T extends (...args: any) => Promise<infer R> ? R : any
