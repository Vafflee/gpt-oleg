import { AudioMessageAttachment, PhotoAttachment, VK } from "vk-io";
import { ENV } from "./constants/env";
import { vkMentionRegexp } from "./constants/constants";
import { executeCommand } from "./middlewares/executeCommand";
import { setConversation } from "./middlewares/setConversation";
import { db } from "./db/db";
import { getAudioTranscription } from "./api/getAudioTranscription";

const vk = new VK({
  token: ENV.VK_TOKEN,
  apiVersion: "5.199",
});

// const conversations = new Map<number, Conversation>();
const userNamesById = new Map<number, string>();

vk.updates.use(setConversation);

vk.updates.use(executeCommand);

// vk.updates.on("message", async (context) => {
//   const audioMessage = context.attachments[0] as AudioMessageAttachment | undefined;
//   if (!audioMessage?.mp3Url) return;

//   const transcription = await getAudioTranscription(audioMessage.mp3Url);
//   console.log(transcription);
  
//   try {
//     let userName = await db.getObjectDefault(`/usernames/${context.senderId}`) as string | null;
//     if (!userName) {
//       const user = await vk.api.users.get({
//         user_ids: [context.senderId],
//       });
//       const nameString = `${user[0].first_name} ${user[0].last_name}`;
//       await db.push(`/usernames/${context.senderId}`, nameString);
//       userName = nameString;
//     }

//     const response = await context.conversation.askTextQuestion(
//       transcription.text,
//       userName,
//     );
//     if (!response) return;

//     await context.send(response);
//   } catch (error) {
//     console.error(error);
//     await context.send(
//       "[ К сожалению, мы не смогли обработать ваш запрос. Попробуйте еще раз. ]"
//     );
//   }
// });

vk.updates.on("message_new", async (context) => {

  const audioMessage = context.attachments[0] as AudioMessageAttachment | undefined;
  let transcription: string | null = null;
  if (audioMessage?.mp3Url) {
    transcription = (await getAudioTranscription(audioMessage.mp3Url)).text;
    console.log(transcription);
  }

  if (!context.text && !transcription) return;

  const text = context.text?.replace(vkMentionRegexp, "").trim() ?? transcription ?? "";
  try {
    let userName = await db.getObjectDefault(`/usernames/${context.senderId}`) as string | null;
    if (!userName) {
      const user = await vk.api.users.get({
        user_ids: [context.senderId],
      });
      const nameString = `${user[0].first_name} ${user[0].last_name}`;
      await db.push(`/usernames/${context.senderId}`, nameString);
      userName = nameString;
    }

    const firstAttachement = context.attachments[0];
    let imageUrl: string | null | undefined = null;
    if (firstAttachement?.type === "photo") {
      const att = firstAttachement as PhotoAttachment;
      imageUrl = att.largeSizeUrl;
    }

    const response = await context.conversation.askTextQuestion(
      text,
      userName,
      imageUrl
    );
    if (!response) return;

    await context.send(response);
  } catch (error) {
    console.error(error);
    await context.send(
      "[ К сожалению, мы не смогли обработать ваш запрос. Попробуйте еще раз. ]"
    );
  }
});

vk.updates.start();
