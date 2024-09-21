import {
  MessageContext,
  PhotoAttachment,
  AudioAttachment,
  AudioMessageAttachment,
  StickerAttachment,
} from "vk-io";
import { AttachmentType, IAttachment } from "../../../types";
import { MessagesMessageAttachment } from "vk-io/lib/api/schemas/objects";

export function convertVkAttachments(context: MessageContext): IAttachment[] {
  const photoAttachments = context
    .getAttachments("photo")
    .filter((photo) => Boolean(photo.largeSizeUrl));

  const audioAttachments = context
    .getAttachments("audio")
    .filter((audio) => Boolean(audio.url));

  const voiceAttachments = context
    .getAttachments("audio_message")
    .filter((voice) => Boolean(voice.url));

  const stickerAttachments = context
    .getAttachments("sticker")
    .filter((sticker) => Boolean(sticker.images.at(-1)?.url));

  return [
    ...photoAttachments,
    ...audioAttachments,
    ...voiceAttachments,
    ...stickerAttachments,
  ].map(convertVkAttachment);
}

export const convertVkAttachment = (
  attachement:
    | PhotoAttachment
    | AudioAttachment
    | AudioMessageAttachment
    | StickerAttachment
): IAttachment => {
  switch (attachement.type) {
    case "photo":
      return {
        type: AttachmentType.PHOTO,
        fileName: `vk-photo-${attachement.id}.jpg`,
        url: (attachement as PhotoAttachment).largeSizeUrl ?? "",
      };
    case "audio":
      return {
        type: AttachmentType.AUDIO,
        fileName: `vk-audio-${attachement.id}.mp3`,
        url: (attachement as AudioAttachment).url ?? "",
      };
    case "audio_message":
      return {
        type: AttachmentType.VOICE,
        fileName: `vk-voice-${attachement.id}.ogg`,
        url: (attachement as AudioMessageAttachment).url ?? "",
      };
    case "sticker":
      return {
        type: AttachmentType.STICKER,
        fileName: `vk-sticker-${attachement.id}.webp`,
        url:
          (attachement as unknown as StickerAttachment).images.at(-1)?.url ??
          "",
      };
    default:
      throw new Error(`Unsupported attachment type: ${attachement.type}`);
  }
};

export const convertApiVkAttachment = (
  attachement: MessagesMessageAttachment
): IAttachment | null => {
  switch (attachement.type) {
    case "photo":
      return {
        type: AttachmentType.PHOTO,
        fileName: `vk-photo-${attachement.photo.id}.jpg`,
        url: attachement.photo.sizes.at(-1)?.url ?? "",
      };
    case "audio":
      return {
        type: AttachmentType.AUDIO,
        fileName: `vk-audio-${attachement.audio.id}.mp3`,
        url: attachement.audio.url ?? "",
      };
    case "audio_message":
      return {
        type: AttachmentType.VOICE,
        fileName: `vk-voice-${attachement.audio_message.id}.ogg`,
        url: attachement.audio_message.link_mp3 ?? "",
      };
    case "sticker":
      return attachement.sticker.images
        ? {
            type: AttachmentType.STICKER,
            fileName: `vk-sticker-${attachement.sticker.id}.webp`,
            url: attachement.sticker.images.at(-1)?.url ?? "",
          }
        : null;
    default:
      return null;
  }
};
