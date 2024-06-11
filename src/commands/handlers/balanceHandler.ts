import { VK } from "vk-io";
import { MessageContext } from "vk-io/lib/structures";
import { Conversation } from "../../classes/conversation/Conversation";
import { ICommandHandler } from "../types";
import { getBalance } from "../../api/getBalance";

export const balanceHandler: ICommandHandler = async ({ context }) => {
  try {
    context.send(
      `[ На вашем счету осталось ${parseFloat(await getBalance()).toFixed(
        2
      )} рублей ]`
    );
  } catch (error) {
    context.send("[ Не удалось получить баланс ]");
  }
};
