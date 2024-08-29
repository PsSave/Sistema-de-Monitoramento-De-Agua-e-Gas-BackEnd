import { Response, Request } from "express";
import UploadService from "../services/UploadService";
import { MeasureRequest } from "../types/measure";

class UploadController {
  async uploadData(req: Request, res: Response) {
    try {
      const data: MeasureRequest = req.body;
      if (
        !data.image || !data.customer_code || !data.measure_datetime || !data.measure_type
      ) {
        return res.status(400).json({
          error_code: "INVALID_DATA",
          error_description:
            "Os dados fornecidos no corpo da requisição são inválidos.",
        });
      }
      const uploadService = new UploadService();
      const result = await uploadService.uploadData(data);
      res.status(200).json(result);
    } catch (error) {
      if((error as any).statusCode === 409) {
        return res.status(409).json({
          error_code: "CONFIRMATION_DUPLICAT",
          error_description: "Já existe uma leitura para este tipo no mês atual",
        });
      }
      res.status(500).json({
        error_code: "INTERNAL_ERROR",
        error_description: "Erro interno do servidor.",
      });
    }
  }
}

export default UploadController;
