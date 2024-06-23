import { ChatCompletionMessageParam } from "openai/resources";
import { Model } from "../../types";
import { ai } from "../../api/ai";

export class ChatModel {
  private model: string;

  constructor({ model }: { model: string }) {
    this.model = model;
  }

  public getModel = () => this.model;
  public setModel = (model: string) => (this.model = model);

  public async generateCompletion(messages: ChatCompletionMessageParam[]) {

    console.log(messages);
    
    const completion = await ai.chat.completions.create({
      model: this.model,
      messages,
    });

    console.log(completion.choices[0].message);
    

    return completion.choices[0].message;
  }
}
