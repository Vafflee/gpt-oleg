import { MessageContext } from "vk-io";
import { MessagesGetHistoryResponse } from "vk-io/lib/api/schemas/responses";
import { VkGroupData, IMessage, Platform } from "../../../../types";
import { convertApiVkAttachment } from "../../attachements/convertVkAttachements";
import { mergeVkMessagesFromSameAuthor } from "../../../../../helpers/mergeMessagesFromSameAuthor";

function convertVkApiAttachments(
  attachments: MessagesGetHistoryResponse["items"][0]["attachments"]
) {
  return attachments
    .map((attachment) => {
      return convertApiVkAttachment(attachment);
    })
    .filter((att) => att !== null) as IMessage["attachments"];
}

export function convertVkApiHistory({
  historyItems,
  context,
  vkGroupData,
  idToUserNameMap,
}: {
  historyItems: MessagesGetHistoryResponse["items"];
  context: MessageContext;
  vkGroupData: VkGroupData;
  idToUserNameMap: Map<number, string>;
}): IMessage[] {
  const history = historyItems
    .map((item) => {
      const attachments = convertVkApiAttachments(item.attachments);

      return {
        text: item.text,
        platform: Platform.VK,
        senderId: Math.abs(item.from_id),
        senderName:
          idToUserNameMap.get(Math.abs(item.from_id)) ?? "Unknown user",
        isFromBot: Math.abs(item.from_id) === vkGroupData.id,
        conversationId: context.conversation?.id ?? context.senderId,
        attachments,
      };
    })
    .filter((item) => {
      return item.text || item.attachments.length > 0;
    })
    .reverse();

  history.pop();

  return history;
}
