import { VkGroupData } from "../../../../types";
import { VkApiHistoryType } from "./getVkApiHistory";

export function buildIdToUserNameMap(
  history: VkApiHistoryType,
  vkGroupData: VkGroupData
) {
  return new Map<number, string>([
    ...history.profiles.map(
      (profile) => [profile.id, `${profile.first_name}`] as const
    ),
    [vkGroupData.id, vkGroupData.name],
  ]);
}
