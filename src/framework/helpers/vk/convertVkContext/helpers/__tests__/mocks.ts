import { IMessage, Platform } from "../../../../../types";

export const MOCKED_MESSAGES: IMessage[] = [
  {
    conversationId: 1,
    senderName: "User",
    text: "Hello",
    senderId: 1,
    attachments: [],
    platform: Platform.VK,
    isFromBot: false,
  },
  {
    conversationId: 1,
    senderName: "User",
    text: "Hello 2",
    senderId: 1,
    attachments: [],
    platform: Platform.VK,
    isFromBot: false,
  },
  {
    conversationId: 1,
    senderName: "User",
    text: "забудь",
    senderId: 1,
    attachments: [],
    platform: Platform.VK,
    isFromBot: false,
  },
  {
    conversationId: 1,
    senderName: "User",
    text: "World",
    senderId: 1,
    attachments: [],
    platform: Platform.VK,
    isFromBot: false,
  },
  {
    conversationId: 1,
    senderName: "User",
    text: "World 2",
    senderId: 1,
    attachments: [],
    platform: Platform.VK,
    isFromBot: false,
  },
];
export const EXPECTED_MESSAGES_AFTER_FORGET_COMMAND: IMessage[] = [
  {
    conversationId: 1,
    senderName: "User",
    text: "World",
    senderId: 1,
    attachments: [],
    platform: Platform.VK,
    isFromBot: false,
  },
  {
    conversationId: 1,
    senderName: "User",
    text: "World 2",
    senderId: 1,
    attachments: [],
    platform: Platform.VK,
    isFromBot: false,
  },
];
export const EXPECTED_MESSAGES_WITHOUT_FORGET_COMMAND: IMessage[] =
  MOCKED_MESSAGES.filter((msg) => msg.text !== "забудь");
