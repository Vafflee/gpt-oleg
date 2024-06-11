import { MessageContext } from "vk-io";
import { vkMentionRegexp } from "../constants/constants";

export const getTextWithoutMentions = (context: MessageContext) => {
  return context.text?.replace(vkMentionRegexp, "").trim().toLowerCase();
};
