import OpenAI from "openai";
import { ENV } from "../constants/env";
import axios from "axios";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources";

export const ai = new OpenAI({
  baseURL: "https://api.vsegpt.ru/v1",
  apiKey: ENV.VSEGPT_TOKEN,
  // dangerouslyAllowBrowser: true,
});

export const aiApi = {
  getChatCompletion: async ({
    model,
    messages,
  }: {
    model: string;
    messages: ChatCompletionMessageParam[];
  }) => {
    const response = await axios.post(
      "https://api.vsegpt.ru/v1/chat/completions",
      {
        model,
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${ENV.VSEGPT_TOKEN}`,
        },
      }
    );
    return response.data as ChatCompletion;
  },
};
