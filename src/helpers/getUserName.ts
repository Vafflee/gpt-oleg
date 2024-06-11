import { MessageContext, VK } from "vk-io";
import { db } from "../db/db";

export async function getUserName(vk: VK, context: MessageContext) {
  let userName = (await db.getObjectDefault(
    `/usernames/${context.senderId}`
  )) as string | null;

  if (userName) {
    return userName;
  }

  try {
    const user = await vk.api.users.get({
      user_ids: [context.senderId],
    });
    const nameString = `${user[0].first_name} ${user[0].last_name}`;
    await db.push(`/usernames/${context.senderId}`, nameString);
    userName = nameString;
  } catch (error) {
    console.error(error);
    userName = "аноним";
  }

  return userName;
}
