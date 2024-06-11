import { MessageContext, PhotoAttachment } from "vk-io";

function isPhotoAttachment(attachment: any): attachment is PhotoAttachment {
  return attachment?.type === "photo";
}

export function getFirstPhotoAttachment(context: MessageContext) {
  const firstAttachment = context.attachments[0];

  if (!isPhotoAttachment(firstAttachment)) {
    return null;
  }

  return firstAttachment.largeSizeUrl;
}
