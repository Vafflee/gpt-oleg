import { vkMentionRegexp } from "../../constants/constants";
import { getTextWithoutMentions } from "../../helpers/getTextWithoutMentions";
import { ICommandHandler } from "../types";

export const drawHandler: ICommandHandler = async ({ context, vk }) => {
  const prompt = getTextWithoutMentions(context);
  if (!prompt) return context.send("[ Укажите что нарисовать ]");

  try {
    console.log("Started drawing: ", prompt);

    context.send("Начинаю рисовать");

    const imageUrl = await context.conversation.generateImage(prompt);
    if (!imageUrl) return context.send("[ Не удалось нарисовать ]");

    console.log("Finished drawing: ", imageUrl);

    const imageAttachement = await vk.upload.messagePhoto({
      source: {
        value: imageUrl,
      },
    });

    context.send({
      message: "Ваше изображение",
      attachment: imageAttachement.toString(),
    });
  } catch (error) {
    console.error(error);

    if (!(error instanceof Error)) return;
    context.send("[ Не удалось нарисовать: " + error.message + " ]");
  }
};
