import { VK } from "vk-io";
import { ENV } from "./constants/env";
import { executeCommand } from "./middlewares/executeCommand";
import { conversationManager } from "./middlewares/conversationManager";
import { extractAudioUrl } from "./helpers/extractAudioUrl";
import { MessageContext } from "vk-io/lib/structures";
import { findAndSetForwardMessages } from "./middlewares/findAndSetForwardMessages";
import { vkMentionRegexp } from "./constants/constants";
import { getAudioTranscription } from "./helpers/getAudioTranscription";
import { getFirstPhotoAttachment } from "./helpers/getFirstPhotoAttachment";
import { getUserName } from "./helpers/getUserName";
import fs from "fs";

const vk = new VK({
  token: ENV.VK_TOKEN,
  apiVersion: "5.199",
});

vk.updates.use(conversationManager);

vk.updates.use((context, next) =>
  findAndSetForwardMessages(context as MessageContext, next, vk)
);

vk.updates.use((context, next) =>
  executeCommand(context as MessageContext, vk, next)
);

vk.updates.on("message_new", async (context) => {
  const audioMessageUrl = await extractAudioUrl(context);
  let transcription: string | null = null;

  try {
    const textToAsk = audioMessageUrl
      ? (await getAudioTranscription(audioMessageUrl)).text
      : context.text?.replace(vkMentionRegexp, "").trim() ?? "";
    console.log("textToAsk", textToAsk);

    if (!textToAsk) return;

    const text = textToAsk;

    const userName = await getUserName(vk, context);

    const imageUrl = getFirstPhotoAttachment(context);

    let response: string | NodeJS.ReadableStream | null = null;
    if (imageUrl) {
      response = await context.conversation.askWithImage(
        text,
        userName,
        imageUrl,
        context.forwardedMessages ?? []
      );
    } else {
      response = await context.conversation.ask(
        text,
        userName,
        context.forwardedMessages ?? []
      );
    }

    if (!response) return;

    if (typeof response === "string") {
      await context.send(response);
      return;
    }

    await context.send("Готово! Ожидайте аудиосообщение...");
    const audioMessageAttachment = await vk.upload.audioMessage({
      source: {
        value: response,
      },
      peer_id: context.peerId,
    });
    console.log("audioMessageAttachment", audioMessageAttachment.toString());

    context.send({
      attachment: audioMessageAttachment.toString(),
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return await context.send(`[ Ошибка: ${error.message} ]`);
    }
    await context.send("[ Неизвестная ошибка ]");
  }
});

vk.updates.start();
