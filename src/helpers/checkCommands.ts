import { MessageContext } from "vk-io";
import { Conversation } from "../classes/conversation";
import { getBalance } from "../api/getBalance";
import { vkMentionRegexp } from "../constants/constants";

const commandsList = [
  {
    command: "баланс",
    handler: async (context: MessageContext, conversation: Conversation) => {
      try {
        context.send(
          `[ На вашем счету осталось ${parseFloat(await getBalance()).toFixed(
            2
          )} рублей ]`
        );
      } catch (error) {
        context.send("[ Не удалось получить баланс ]");
      }
    },
  },
  {
    command: "выбрать модель",
    handler: async (context: MessageContext, conversation: Conversation) => {
      // use the last word
      const model = context.text?.split(" ").pop();
      if (!model) return context.send("[ Укажите модель, напр 'выбрать модель openai/gpt-4o' ]");
      conversation.textModel = model;
      context.send(`[ Выбрана модель: ${conversation.textModel} ]`);
    },
  },
  {
    command: 'модель',
    handler: async (context: MessageContext, conversation: Conversation) => {
      context.send(`[ Текущая модель: ${conversation.textModel} ]`);
    }
  },
  {
    command: 'системное сообщение',
    handler: async (context: MessageContext, conversation: Conversation) => {
      context.send(`[ Текущее системное сообщение: ${conversation.systemMessage.content} ]`);
    }
  },
  {
    command: 'новое системное сообщение',
    handler: async (context: MessageContext, conversation: Conversation) => {
      conversation.systemMessage.content = context.text?.split(' ').slice(3).join(' ') || '';
      context.send(`[ Системное сообщение изменено на: ${conversation.systemMessage.content} ]`);
    }
  }
];

export async function checkCommands(
  context: MessageContext,
  conversation: Conversation
) {
  const text = context.text?.replace(vkMentionRegexp, "").trim().toLowerCase();
  const hasCommand = commandsList.find((command) =>
    text?.startsWith(command.command)
  );
  if (!hasCommand) return false;
  const command = commandsList.find((command) => text?.startsWith(command.command));
  if (!command) return false;
  await command.handler(context, conversation);
  await conversation.save();
  return true;
}
