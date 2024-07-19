import OpenAI from "openai";
import { ENV } from "../constants/env";

export const ai = new OpenAI({
  baseURL: "https://api.vsegpt.ru/v1",
  apiKey: ENV.VSEGPT_TOKEN,
});