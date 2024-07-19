import { db } from "../../db/db";
import { buildMessage } from "../../helpers/buildMessage";
import { buildSystemPrompt, defaultSystemPrompt } from "./helpers";
import { ChatModel } from "../models/ChatModel";
import { Model } from "../../types";
import { ArtistModel } from "../models/ArtistModel";
import { ChatCompletionMessageParam } from "openai/resources";
import { ENV } from "../../constants/env";

export type ConversationConstructorParams = {
  id: number;
  systemPrompt?: string;
  textModel?: string;
  visionModel?: string;
};

export type SerializedConversation = {
  id: number;
  systemPrompt: string;
  textModel: string;
  visionModel: string;
};

export class Conversation {
  public readonly id: number;
  public systemPrompt: string;

  public readonly textModel: ChatModel;
  public readonly visionModel: ChatModel;
  public readonly artistModel: ArtistModel;

  constructor({
    id,
    systemPrompt = ENV.DEFAULT_SYSTEM_PROMPT,
    textModel = ENV.DEFAULT_TEXT_MODEL,
    visionModel = ENV.DEFAULT_VISION_MODEL,
  }: ConversationConstructorParams) {
    this.id = id;
    this.systemPrompt = systemPrompt;
    this.textModel = new ChatModel({ model: textModel });
    this.visionModel = new ChatModel({
      model: visionModel,
    });
    this.artistModel = new ArtistModel();
  }

  serialize(): SerializedConversation {
    return {
      id: this.id,
      systemPrompt: this.systemPrompt,
      textModel: this.textModel.getModel(),
      visionModel: this.visionModel.getModel(),
    };
  }

  async ask(
    messageToAsk: string,
    userName: string,
    forwards: ChatCompletionMessageParam[],
  ) {
    const messages = [
      buildSystemPrompt(this.systemPrompt),
      ...forwards,
      buildMessage({ userName, text: messageToAsk }),
    ];

    const completion = await this.textModel.generateCompletion(messages);

    await Conversation.save(this);

    return completion.content;
  }

  async askWithImage(
    messageToAsk: string,
    userName: string,
    imageUrl: string,
    forwards: ChatCompletionMessageParam[],
  ) {
    const messages = [
      buildSystemPrompt(this.systemPrompt),
      ...forwards,
      buildMessage({ userName, text: messageToAsk, imageUrl }),
    ];

    const completion = await this.visionModel.generateCompletion(messages);

    await Conversation.save(this);

    return completion.content;
  }

  async generateImage(prompt: string) {
    return this.artistModel.generateImage(prompt);
  }

  async editImage(prompt: string, imageUrl: string) {
    return this.artistModel.editImage(prompt, imageUrl);
  }

  static async save(conversation: Conversation) {
    const serializedConversation = conversation.serialize();
    await db.push("/conversations/" + conversation.id, serializedConversation);
  }

  static async loadOrCreate(id: number) {
    const conversationData =
      (await db.getObjectDefault<SerializedConversation | null>(
        `/conversations/${id}`
      ),
      null);

    return new Conversation(conversationData ?? { id });
  }
}
