import { createDbConnection } from "../../db/db";
import { buildMessage } from "../../helpers/buildMessage";
import { buildSystemPrompt } from "./helpers";
import { ChatModel } from "../models/ChatModel";
import { ArtistModel } from "../models/ArtistModel";
import { ChatCompletionMessageParam } from "openai/resources";
import { ENV } from "../../constants/env";

export type ConversationConstructorParams = {
  id: number;
  systemPrompt?: string;
  textModel?: string;
  visionModel?: string;
  memory?: string[];
};
export type SerializedConversation = {
  id: number;
  systemPrompt: string;
  textModel: string;
  visionModel: string;
  memory: string[];
};

export class Conversation {
  private memory: string[] = [];

  public readonly artistModel: ArtistModel;
  public readonly id: number;
  public readonly systemPrompt: string;
  public readonly textModel: ChatModel;
  public readonly visionModel: ChatModel;

  constructor({
    id,
    systemPrompt = ENV.DEFAULT_SYSTEM_PROMPT,
    textModel = ENV.DEFAULT_TEXT_MODEL,
    visionModel = ENV.DEFAULT_VISION_MODEL,
    memory = [],
  }: ConversationConstructorParams) {
    this.id = id;
    this.systemPrompt = systemPrompt;
    this.memory = memory;

    this.textModel = new ChatModel({ model: textModel });
    this.visionModel = new ChatModel({
      model: visionModel,
    });
    this.artistModel = new ArtistModel();
  }

  public static async loadOrCreate(id: number) {
    const conversationData =
      (await createDbConnection().getObjectDefault<SerializedConversation | null>(
        `/conversations/${id}`
      ),
      null);

    console.log("ID:", id);

    console.log("ConversationData:", conversationData);

    const conversation = new Conversation(conversationData ?? { id });
    await createDbConnection().push("/conversations/" + id, conversation.serialize());

    return conversation;
  }

  public static async save(conversation: Conversation) {
    const serializedConversation = conversation.serialize();
    await createDbConnection().push(
      "/conversations/" + conversation.id,
      serializedConversation
    );
  }

  public async ask({
    messageToAsk,
    userName,
    history = [],
    context,
  }: {
    messageToAsk: string;
    userName: string;
    history?: ChatCompletionMessageParam[];
    context?: string;
  }) {
    const messages = [
      buildSystemPrompt(this.systemPrompt, context, this.memory),
      ...history,
      buildMessage({ userName, text: messageToAsk }),
    ];

    const completion = await this.textModel.generateCompletion(messages);

    await Conversation.save(this);

    return completion.content;
  }

  public async askVision({
    userName,
    imageUrl,
    history = [],
    messageToAsk,
    context,
  }: {
    userName: string;
    messageToAsk?: string;
    imageUrl: string;
    history?: ChatCompletionMessageParam[];
    context?: string;
  }) {
    const messages = [
      buildSystemPrompt(this.systemPrompt, context),
      ...history,
      buildMessage({ userName, text: messageToAsk, imageUrl }),
    ];

    console.log(messages.map((m) => m.content));

    const completion = await this.visionModel.generateCompletion(messages);

    await Conversation.save(this);

    return completion.content;
  }

  public clearMemory() {
    this.memory = [];
  }

  public async editImage(prompt: string, imageUrl: string) {
    return this.artistModel.editImage(prompt, imageUrl);
  }

  public async generateImage(prompt: string) {
    return this.artistModel.generateImage(prompt);
  }

  public getMemory() {
    return this.memory;
  }

  public remember(fact: string) {
    this.memory.push(fact);
  }

  public serialize(): SerializedConversation {
    return {
      id: this.id,
      systemPrompt: this.systemPrompt,
      textModel: this.textModel.getModel(),
      visionModel: this.visionModel.getModel(),
      memory: this.memory,
    };
  }
}
