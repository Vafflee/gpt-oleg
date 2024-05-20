import { ai } from "./ai";

export async function getAudioTranscription(url: string) {
    const transcription = await ai.audio.transcriptions.create({
      file: await fetch(url),
      model: "stt-openai/whisper-1",
      response_format: "text",
      language: "ru",
    });
    return transcription;
}
