import { config } from 'dotenv';

config();

if (!process.env.PORT) {
  throw new Error('PORT is not provided');
}
if (!process.env.VK_TOKEN) {
  throw new Error('VK_TOKEN is not provided');
}
if (!process.env.VSEGPT_TOKEN) {
  throw new Error('VSEGPT_TOKEN is not provided');
}
if (!process.env.DEFAULT_TEXT_MODEL) {
  throw new Error('DEFAULT_TEXT_MODEL is not provided');
}
if (!process.env.DEFAULT_VISION_MODEL) {
  throw new Error('DEFAULT_VISION_MODEL is not provided');
}
if (!process.env.DEFAULT_SYSTEM_PROMPT) {
  throw new Error('DEFAULT_SYSTEM_PROMPT is not provided');
}
if (!process.env.DEFAULT_SUMMARIZATION_MODEL) {
  throw new Error('DEFAULT_SUMMARIZATION_MODEL is not provided');
}

export const ENV = {
  PORT: process.env.PORT,
  VK_TOKEN: process.env.VK_TOKEN,
  VSEGPT_TOKEN: process.env.VSEGPT_TOKEN,
  DEFAULT_TEXT_MODEL: process.env.DEFAULT_TEXT_MODEL,
  DEFAULT_VISION_MODEL: process.env.DEFAULT_VISION_MODEL,
  DEFAULT_SYSTEM_PROMPT: process.env.DEFAULT_SYSTEM_PROMPT,
  DEFAULT_SUMMARIZATION_MODEL: process.env.DEFAULT_SUMMARIZATION_MODEL,
}