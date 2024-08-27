import { dirname } from "path";
import { MeasureRequest } from "../types/meansure";
import { genAI } from "../utils/genAI";
import { v4 as uuidv4 } from "uuid";

const mediaPath = dirname(require.main!.filename) + "/media";

class UploadService {
  async uploadFile(file: MeasureRequest) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    function fileToGenerativePart() {
      return {
        inlineData: {
          data: file.image,
          mimeType: "image/jpeg",
        },
      };
    }
    const prompt =
      "Is there a number in this image and if so, what does it say, just show me the main numbers, no need to send me explanatory text?";
    const imagePart = fileToGenerativePart();

    const result = await model.generateContent([prompt, imagePart]);
    const imageUrl = `data:image/jpeg;base64,${file.image}`;
    return {
      image_url: imageUrl,
      measure_value: result.response.text(),
      measure_uuid: uuidv4(),
    };
  }
}

export default UploadService;
