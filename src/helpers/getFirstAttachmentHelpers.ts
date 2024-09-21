import { IAttachment, IMessage } from "../framework/types";

export function getFirstPhotoAttachment(message: IMessage): IAttachment | null {
  const firstPhotoAttachment = message.attachments.filter(
    (att) => att.type === "photo"
  )[0];

  return firstPhotoAttachment;
}

export function getFirstStickerAttachment(
  message: IMessage
): IAttachment | null {
  const firstStickerAttachment = message.attachments.filter(
    (att) => att.type === "sticker"
  )[0];

  return firstStickerAttachment;
}

export function getFirstAudioAttachment(message: IMessage): IAttachment | null {
  const firstAudioAttachment = message.attachments.filter(
    (att) => att.type === "audio"
  )[0];

  return firstAudioAttachment;
}
