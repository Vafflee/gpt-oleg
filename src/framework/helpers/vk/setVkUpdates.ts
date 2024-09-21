import { VK, MessageContext } from "vk-io";
import {
  IMiddleware,
  ICommandHandler,
  IBotAppContext,
  VkGroupData,
} from "../../types";
import { convertVkContext } from "./convertVkContext";
import { isMessage } from "./messageContextGuard";
import { getTextWithoutMentions } from "../../../helpers/getTextWithoutMentions";
import { vkMentionRegexp } from "../../../constants/constants";

type SetVkUpdatesParams<TAdditionalData> = {
  vk: VK;
  middlewares: IMiddleware<TAdditionalData | null>[];
  commandHandlers: Record<string, ICommandHandler<TAdditionalData | null>>;
  defaultHandler: ICommandHandler<TAdditionalData | null>;
  vkGroupData: VkGroupData;
  historyCount: number;
};

export function setVkUpdates<TAdditionalData>({
  vk,
  middlewares,
  commandHandlers,
  defaultHandler,
  vkGroupData,
  historyCount,
}: SetVkUpdatesParams<TAdditionalData>) {
  vk.updates.on("message_new", async (context) => {
    if (!isMessage(context)) return;

    const convertedContext = (await convertVkContext({
      vk,
      context,
      vkGroupData,
      historyCount,
    })) as IBotAppContext<TAdditionalData | null>;

    for (const middleware of middlewares) {
      await middleware(convertedContext, () => {});
    }

    const [command, ...args] =
      convertedContext.message.text
        ?.replace(vkMentionRegexp, "")
        .trim()
        .toLowerCase()
        .split(" ") ?? [];

    if (command && commandHandlers[command]) {
      return commandHandlers[command](convertedContext, ...args);
    }

    defaultHandler(convertedContext);
  });

  vk.updates.start().catch(console.error);
}
