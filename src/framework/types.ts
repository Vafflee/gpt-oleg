export enum Platform {
  VK = "vk",
  TELEGRAM = "telegram",
}

export interface IMessage {
  text?: string;
  platform: Platform;
  senderId: number;
  isFromBot: boolean;
  senderName: string;
  conversationId: number;
  attachments: IAttachment[];
}

export enum AttachmentType {
  PHOTO = "photo",
  AUDIO = "audio",
  VIDEO = "video",
  FILE = "file",
  VOICE = "voice",
  STICKER = "sticker",
}

export interface IAttachment {
  type: AttachmentType;
  fileName: string;
  url: string;
}

export type ReplyParams = {
  text: string;
  attachments?: IAttachment[];
} | string;

export interface IBotAppContext<TAdditionalData = any> {
  message: IMessage;
  history: IMessage[];
  reply: (params: ReplyParams) => void;
  additionalData: TAdditionalData | null;
}

export interface IBotApp<TAdditionalData> {
  addMiddleware: (middleware: IMiddleware<TAdditionalData | null>) => void;
  addCommand: (
    command: string,
    handler: ICommandHandler<TAdditionalData | null>
  ) => void;
  setDefaultHandler: (handler: ICommandHandler<TAdditionalData | null>) => void;
  start: () => void;
}

export type IMiddleware<TAdditionalData> = (
  context: IBotAppContext<TAdditionalData | null>,
  next: () => void
) => Promise<void>;

export type ICommandHandler<TAdditionalData> = (
  context: IBotAppContext<TAdditionalData | null>,
  ...args: string[]
) => void;

export type VkGroupData = {
  id: number;
  name: string;
};