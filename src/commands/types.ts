import { MessageContext, VK } from "vk-io";
import { Conversation } from "../classes/conversation/Conversation";

export enum CommandType {
  balance = "balance",
  draw = "draw",
}

export type ICommandHandler = (params: {
  context: MessageContext;
  vk: VK;
}) => void;
