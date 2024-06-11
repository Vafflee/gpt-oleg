import { Model } from "../../types";
import { ai } from "../../api/ai";
import { TranscriptionCreateParams } from "openai/resources/audio/transcriptions";

export class TranscriptionModel {
  private model: string = Model.transcription;

  public getModel = () => this.model;
  public setModel = (model: string) => (this.model = model);

  private responseFormat: TranscriptionCreateParams['response_format'] = "text";
  private language: string = "ru";

  public async getTranscription(audioUrl: string) {
    const transcription = await ai.audio.transcriptions.create({
      file: await fetch(audioUrl),
      model: this.model,
      response_format: this.responseFormat,
      language: this.language,
    });
    return transcription;
  }
}

export const transcriptionModel = new TranscriptionModel();
