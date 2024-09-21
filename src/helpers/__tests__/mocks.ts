import { IMessage, Platform } from "../../framework/types";

export const MOCKED_MESSAGES: IMessage[] = [
  {
    text: "Hello",
    platform: Platform.VK,
    senderId: 1,
    senderName: "User1",
    isFromBot: false,
    conversationId: 1,
    attachments: [],
  },
  {
    text: "World",
    platform: Platform.VK,
    senderId: 2,
    senderName: "User2",
    isFromBot: false,
    conversationId: 1,
    attachments: [],
  },
  {
    text: "How are you?",
    platform: Platform.VK,
    senderId: 1,
    senderName: "User1",
    isFromBot: false,
    conversationId: 1,
    attachments: [],
  },
  {
    text: "I'm fine",
    platform: Platform.VK,
    senderId: 2,
    senderName: "User2",
    isFromBot: false,
    conversationId: 1,
    attachments: [],
  },
  {
    text: "Good",
    platform: Platform.VK,
    senderId: 1,
    senderName: "User1",
    isFromBot: false,
    conversationId: 1,
    attachments: [],
  },
  {
    text: "Bye",
    platform: Platform.VK,
    senderId: 2,
    senderName: "User2",
    isFromBot: false,
    conversationId: 1,
    attachments: [],
  },
];

export const NUMBER_OF_MESSAGES = 3;

export const EXPECTED_LAST_MESSAGES = [
  {
    text: "I'm fine",
    platform: Platform.VK,
    senderId: 2,
    senderName: "User2",
    isFromBot: false,
    conversationId: 1,
    attachments: [],
  },
  {
    text: "Good",
    platform: Platform.VK,
    senderId: 1,
    senderName: "User1",
    isFromBot: false,
    conversationId: 1,
    attachments: [],
  },
  {
    text: "Bye",
    platform: Platform.VK,
    senderId: 2,
    senderName: "User2",
    isFromBot: false,
    conversationId: 1,
    attachments: [],
  },
];

export const EXPECTED_CONTEXT_MESSAGES = [
  {
    text: "Hello",
    platform: Platform.VK,
    senderId: 1,
    senderName: "User1",
    isFromBot: false,
    conversationId: 1,
    attachments: [],
  },
  {
    text: "World",
    platform: Platform.VK,
    senderId: 2,
    senderName: "User2",
    isFromBot: false,
    conversationId: 1,
    attachments: [],
  },
  {
    text: "How are you?",
    platform: Platform.VK,
    senderId: 1,
    senderName: "User1",
    isFromBot: false,
    conversationId: 1,
    attachments: [],
  },
];
