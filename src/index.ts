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
      : context.text;

    if (!textToAsk) return;

    const text =
      context.text?.replace(vkMentionRegexp, "").trim() ?? transcription ?? "";

    const userName = await getUserName(vk, context);

    const imageUrl = getFirstPhotoAttachment(context);

    let responseText = null;
    if (imageUrl) {
      responseText = await context.conversation.askWithImage(
        text,
        userName,
        imageUrl,
        context.forwardedMessages ?? []
      );
    } else {
      responseText = await context.conversation.ask(
        text,
        userName,
        context.forwardedMessages ?? []
      );
    }

    if (!responseText) return;

    context.send(responseText);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return await context.send(`[ Ошибка: ${error.message} ]`);
    }
    await context.send("[ Неизвестная ошибка ]");
  }
});

vk.updates.start();
