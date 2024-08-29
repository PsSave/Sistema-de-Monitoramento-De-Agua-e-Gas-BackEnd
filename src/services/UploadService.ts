import { MeasureRequest } from "../types/measure";
import { genAI } from "../utils/genAI";
import { v4 as uuidv4 } from "uuid";
import { query } from "../database/db";

class UploadService {
  async uploadData(data: MeasureRequest) {
    const existingMeasure = await query(
      'SELECT * FROM measurements WHERE customer_code = $1 AND measure_type = $2 AND EXTRACT(MONTH FROM measure_datetime) = EXTRACT(MONTH FROM $3::timestamp)',
      [data.customer_code, data.measure_type, data.measure_datetime]
    );
    if(existingMeasure.rowCount! > 0) {
      const error = new Error("DOUBLE_REPORT");
      (error as any).statusCode = 409;
      throw error;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    function fileToGenerativePart() {
      return {
        inlineData: {
          data: data.image,
          mimeType: "image/jpeg",
        },
      };
    }
    const prompt =
      "Can you identify and return only the numbers displayed on the meter, without any additional text or line breaks?";
    const imagePart = fileToGenerativePart();

    const result = await model.generateContent([prompt, imagePart]);
    const imageUrl = `data:image/jpeg;base64,${data.image}`;
    const measureUuid = uuidv4();

    await query('INSERT INTO measurements (customer_code, measure_datetime, measure_type, measure_value, image_url, measure_uuid) VALUES ($1, $2, $3, $4, $5, $6)', [
      data.customer_code,
      data.measure_datetime,
      data.measure_type,
      result.response.text(),
      imageUrl,
      measureUuid
    ])
    
    return {
      image_url: imageUrl,
      measure_value: parseInt(result.response.text()), // Converte o valor para inteiro
      measure_uuid: measureUuid
    };
  }
}

export default UploadService;
