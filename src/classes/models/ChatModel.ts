import { ChatCompletionMessageParam } from "openai/resources";
import { Model } from "../../types";
import { ai } from "../../api/ai";

export class ChatModel {
  private model: string;

  constructor({ model = Model.gpt4o }: { model?: string }) {
    this.model = model;
  }

  public getModel = () => this.model;
  public setModel = (model: string) => (this.model = model);

  public async generateCompletion(messages: ChatCompletionMessageParam[]) {

    const completion = await ai.chat.completions.create({
      model: this.model,
      messages,
    });

    return completion.choices[0].message;
  }
}
