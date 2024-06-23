import { vkMentionRegexp } from "../../constants/constants";
import { getFirstPhotoAttachment } from "../../helpers/getFirstPhotoAttachment";
import { getTextWithoutMentions } from "../../helpers/getTextWithoutMentions";
import { ICommandHandler } from "../types";

export const editHandler: ICommandHandler = async ({ context, vk }) => {
  const prompt = getTextWithoutMentions(context);
  if (!prompt) return context.send("[ Укажите что нарисовать ]");

  const imageUrl = getFirstPhotoAttachment(context);
  if (!imageUrl) return context.send("[ Прикрепите изображение ]");

  try {
    console.log("Started editing: ", prompt);

    context.send("Начинаю редактировать");

    const generatedImageUrl = await context.conversation.editImage(prompt, imageUrl);
    if (!generatedImageUrl) return context.send("[ Не удалось нарисовать ]");

    console.log("Finished editing: ", generatedImageUrl);

    const imageAttachement = await vk.upload.messagePhoto({
      source: {
        value: generatedImageUrl,
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
