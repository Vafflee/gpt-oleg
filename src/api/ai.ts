import { ENV } from "../constants/env";
import OpenAI from "openai";

export const ai = new OpenAI({
  baseURL: "https://api.vsegpt.ru/v1",
  apiKey: ENV.VSEGPT_TOKEN,
  // dangerouslyAllowBrowser: true,
})