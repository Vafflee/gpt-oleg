import { MessageContext, VK } from "vk-io";
import { IBotAppContext, Platform, VkGroupData } from "../../../types";
import { convertVkAttachments } from "../attachements/convertVkAttachements";
import { getVkApiHistory } from "./helpers/getVkApiHistory";
import { buildIdToUserNameMap } from "./helpers/buildIdToUserNameMap";
import { convertVkApiHistory } from "./helpers/convertVkApiHistory";
import { vkMentionRegexp } from "../../../../constants/constants";

type ConvertVkContextParams = {
  vk: VK;
  context: MessageContext;
  vkGroupData: VkGroupData;
  historyCount: number;
};

export async function convertVkContext<TAdditionalData>({
  vk,
  context,
  vkGroupData,
  historyCount,
}: ConvertVkContextParams): Promise<IBotAppContext<TAdditionalData | null>> {
  const history = await getVkApiHistory(vk, context, historyCount);

  const idToUserNameMap = buildIdToUserNameMap(history, vkGroupData);

  const convertedHistory = convertVkApiHistory({
    historyItems: history.items,
    context,
    vkGroupData,
    idToUserNameMap,
  })
    .filter((item) => {
      return !item?.text?.startsWith("[");
    })
    .map((item) => ({
      ...item,
      text: item.text?.replace(vkMentionRegexp, "Олег"),
    }));

  return {
    message: {
      text: context.text,
      platform: Platform.VK,
      senderId: context.senderId,
      senderName: idToUserNameMap.get(context.senderId) ?? "Unknown user",
      isFromBot: context.senderId === vkGroupData.id,
      conversationId: context.conversation?.id ?? context.senderId,
      attachments: convertVkAttachments(context),
    },
    history: convertedHistory,
    reply: (params) => {
      if (typeof params === "string") {
        context.send(params);
        return;
      }

      const { text, attachments } = params;
      context.send(text);
    },
    additionalData: null,
  };
}
