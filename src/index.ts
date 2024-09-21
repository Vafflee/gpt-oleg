import { BotApp } from "./framework/BotApp";
import { conversationManager } from "./middlewares/conversationManager";
import { CtxData } from "./types";
import { getFirstPhotoAttachment } from "./helpers/getFirstAttachmentHelpers";
import { getDataForCompletionFromContext } from "./helpers/prepareDataForCompletion";
import { getCompletion } from "./helpers/getCompletion";
import { Conversation } from "./classes/conversation/Conversation";

const app = new BotApp<CtxData>();

app.addMiddleware(conversationManager);

app.addMiddleware(async (ctx) => {
  // console.log(context.message.attachments);
  // console.log(context.history);
});

app.addCommand("ping", (ctx) => {
  ctx.reply("Pong!");
});

// app.addCommand("запомни", async (ctx, ...args) => {
//   const conversation = ctx.additionalData?.conversation;
//   if (!conversation) return;

//   if (args.length === 0) {
//     ctx.reply("[ Необходимо передать текст для запоминания ]");
//     return;
//   }

//   const textToRemember = args.join(" ");
//   conversation.remember(textToRemember);

//   await Conversation.save(conversation);
//   ctx.reply('[ Запомнил факт: "' + textToRemember + '" ]');
// });

app.addCommand("забудь", (ctx) => {
  ctx.reply(
    "[ Это сообщение и все предыдущие не будут учитываться в истории ]"
  );
});

app.setDefaultHandler(async (ctx) => {
  const conversation = ctx.additionalData?.conversation;
  if (!conversation) return;

  const dataForCompletion = await getDataForCompletionFromContext(ctx);
  console.log("Last messages:");
  console.log(dataForCompletion.lastMessages);

  try {
    const completionText = await getCompletion(conversation, dataForCompletion);
    console.log(completionText);
    if (!completionText) return;

    ctx.reply(completionText);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      ctx.reply(`[ ${error.message} ]`);
    }
  }
});

app.start();
