import { transcriptionModel } from "../classes/models/TranscriptionModel";

export async function getAudioTranscription(url: string) {
  const audioMessageUrl = await transcriptionModel.getTranscription(url);
  return audioMessageUrl;
}