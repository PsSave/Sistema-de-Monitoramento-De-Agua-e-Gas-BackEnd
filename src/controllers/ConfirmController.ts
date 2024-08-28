import { Response, Request } from "express";
import { ConfirmedType} from "../types/measure";
import ConfirmService from "../services/ConfirmService";

class ConfirmController {
  async confirmedData(req: Request, res: Response) {
    try {
      const data: ConfirmedType = req.body;
      if (typeof data.measure_uuid !== 'string' || typeof data.confirmed_value !== 'number') {
        return res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: "Os dados fornecidos no corpo da requisição são inválidos",
        });
      }
      const confirmService = new ConfirmService()
      const result = await confirmService.confirmData(data)
      res.status(200).json(result);
    } catch (error) {
      if((error as any).statusCode === 404) {
        return res.status(404).json({
          error_code: "MEASURE_NOT_FOUND",
          error_description: "Leitura não encontrada.",
        });
      }
      if((error as any).statusCode === 409) {
        return res.status(409).json({
          error_code: "CONFIRMATION_DUPLICAT",
          error_description: "Leitura já confirmada",
        });
      }
      return res.status(500).json({
        error_code: "INTERNAL_ERROR",
        error_description: "Erro interno do servidor.",
      });
    }
  }
}

export default ConfirmController;
