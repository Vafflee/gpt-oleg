import { Conversation } from "./classes/conversation";

export type Message = {
  role: string;
  content: string | (
    | { type: "text"; text: string }
    | { type: "image_url"; image_url: string }
  )[];
};

export type MessageWithImage = {
  role: "image_url";
  image_url: string;
};

export type ConversationHistory = (Message | MessageWithImage)[];

export enum Model {
  geminiFlash = "google/gemini-flash-1.5",
  claudeHaiku = "anthropic/claude-3-haiku",
  gpt4o = "openai/gpt-4o",
  gpt4ovision = "vis-openai/gpt-4o",
  gpt35turbo = "openai/gpt-3.5-turbo-0125",
  llama4lumimaid = "neversleep/llama-3-lumimaid-8b-large",
  geminiProVision = "vis-google/gemini-pro-1.5",
}

export type SerializedConversation = {
  id: number;
  history: ConversationHistory;
  systemMessage: {
    role: "system";
    content: string;
  };
  maxHistoryLength: number;
  textModel: string;
  visionModel: string;
};

declare module "vk-io" {
  interface MessageContext {
    conversation: Conversation;
  }
}
