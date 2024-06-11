import { ImageGenerateParams } from "openai/resources";
import { ai } from "../../api/ai";
import { Model } from "../../types";

export class ArtistModel {
  private generatingModel: string = Model.dallE3;
  private editingModel: string = Model.dallE2;
  private size = "1024x1024" as const;
  private numberOfVariants: number = 1;

  public async generateImage(prompt: string) {
    const response = await ai.images.generate({
      model: this.generatingModel,
      prompt: prompt,
      size: this.size,
      n: this.numberOfVariants,
    });
    
    return response.data[0].url;
  }

  public async editImage(prompt: string, imageUrl: string) {
    const imageUploadable = await fetch(imageUrl);

    const response = await ai.images.edit({
      model: this.editingModel,
      prompt: prompt,
      image: imageUploadable,
      size: this.size,
      n: this.numberOfVariants,
    });
    return response.data[0].url;
  }
}
