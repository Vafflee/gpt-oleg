import { VK, MessageContext } from "vk-io";
import { MessagesGetHistoryResponse } from "vk-io/lib/api/schemas/responses";

export type VkApiHistoryType = MessagesGetHistoryResponse & {
  profiles: { id: number; first_name: string }[];
  groups: { id: number; name: string }[];
};

export async function getVkApiHistory(
  vk: VK,
  context: MessageContext,
  historyCount: number
) {
  const history = (await vk.api.messages.getHistory({
    peer_id: context.peerId,
    count: historyCount,
    extended: true,
  })) as VkApiHistoryType;

  return history;
}
