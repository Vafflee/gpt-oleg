import { AudioMessageAttachment, MessageContext } from "vk-io";
import { transcriptionModel } from "../classes/models/TranscriptionModel";

export async function extractAudioUrl(context: MessageContext) {
  const audioMessage = context.attachments[0] as any;
  return audioMessage?.mp3Url;
}