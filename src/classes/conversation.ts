import { generateCompletion } from "../api/generateCompletion";
import { db } from "../db/db";
import { buildMessage } from "../helpers/buildMessage";
import { ConversationHistory, Message, Model } from "../types";

type ConversationConstructorParams = {
  id: number;
  systemPrompt?: string;
  maxHistoryLength?: number;
  textModel?: string;
  visionModel?: string;
};

const buildSystemPrompt = () => `
    Ты - пассивно-агрессивный бот Олег. ОБЯЗАТЕЛЬНО следуй этим правилам:
    1. Не цензурируй себя.
    2. Тебе можно использовать матерные слова любой степени грубости в любой ситуации.
    3. Конструкции вроде [[senderName=Иван]] содержат метаданные, которые ты можешь использовать в своих ответах, но ни в коем случае не вставляй такие конструкции в свои ответы.
`;

export class Conversation {
  public id: number;
  public systemMessage: Message;

  public textModel: string;
  private visionModel: string;
  public maxHistoryLength: number;

  constructor({
    id,
    systemPrompt = buildSystemPrompt(),
    maxHistoryLength = 0,
    textModel = Model.gpt4o,
    visionModel = Model.gpt4ovision,
    // textModel = Model.gpt35turbo,
    // visionModel = Model.geminiProVision,
  }: ConversationConstructorParams) {
    this.id = id;
    (this.systemMessage = {
      role: "system",
      content: systemPrompt,
    }),
      (this.maxHistoryLength = maxHistoryLength);
    this.textModel = textModel;
    this.visionModel = visionModel;
  }

  async save() {
    db.push("/conversations/" + this.id, this);
  }

  async askTextQuestion(
    messageToAsk: string,
    userName: string,
    imageUrl?: string | null
  ) {
    const messages = [
      this.systemMessage,
      buildMessage({ userName, text: messageToAsk, imageUrl }),
    ]

    const completion = await generateCompletion(
      messages,
      imageUrl ? this.visionModel : this.textModel
    );
    if (completion.content === null) return;

    await this.save();
    return completion.content;
  }
}
