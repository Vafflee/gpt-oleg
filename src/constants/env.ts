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

export const ENV = {
  PORT: process.env.PORT,
  VK_TOKEN: process.env.VK_TOKEN,
  VSEGPT_TOKEN: process.env.VSEGPT_TOKEN,
}