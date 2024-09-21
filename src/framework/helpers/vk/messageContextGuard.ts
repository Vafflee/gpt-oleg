import { Context, MessageContext } from "vk-io";

export const isMessage = (context: Context): context is MessageContext => {
  return context.is(["message"]);
};
