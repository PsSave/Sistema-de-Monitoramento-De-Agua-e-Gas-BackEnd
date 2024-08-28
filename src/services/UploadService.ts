import { MeasureRequest } from "../types/meansure";
import { genAI } from "../utils/genAI";
import { v4 as uuidv4 } from "uuid";

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
      "Can you identify and return only the numbers displayed on the meter, without any additional text or line breaks?";
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
