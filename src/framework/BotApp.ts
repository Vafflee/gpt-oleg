import { VK } from "vk-io";
import {
  IBotApp,
  IBotAppContext,
  ICommandHandler,
  IMiddleware,
  VkGroupData,
} from "./types";
import { createVK } from "./helpers/vk/createVK";
import { setVkUpdates } from "./helpers/vk/setVkUpdates";

type MetadataType = {
  vk: {
    botId: number;
    botName: string;
  } | null;
};

export class BotApp<TAdditionalData> implements IBotApp<TAdditionalData> {
  private cores: Record<string, VK> = {
    vk: createVK(),
  };

  private middlewares: IMiddleware<TAdditionalData | null>[] = [];

  private commands: Record<string, ICommandHandler<TAdditionalData | null>> =
    {};

  private defaultHandler: ICommandHandler<TAdditionalData | null> = () => {};

  public addMiddleware(middleware: IMiddleware<TAdditionalData | null>): void {
    this.middlewares.push(middleware);
  }

  public addCommand(
    command: string,
    handler: (context: IBotAppContext<TAdditionalData | null>, ...args: string[]) => void
  ): void {
    this.commands[command] = handler;
  }

  public setDefaultHandler(
    handler: (context: IBotAppContext<TAdditionalData | null>) => void
  ): void {
    this.defaultHandler = handler;
  }

  public async start(): Promise<void> {
    const vkGroupResponse = await this.cores.vk.api.groups.getById({});

    const vkGroupData: VkGroupData = {
      id: vkGroupResponse.groups[0].id,
      name: vkGroupResponse.groups[0].name,
    };

    setVkUpdates({
      vk: this.cores.vk,
      middlewares: this.middlewares,
      commandHandlers: this.commands,
      defaultHandler: this.defaultHandler,
      vkGroupData,
      historyCount: 50,
    });
  }
}
