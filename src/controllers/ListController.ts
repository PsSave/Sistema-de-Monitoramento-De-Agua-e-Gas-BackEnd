import { Request, Response } from "express";
import ListService from "../services/ListService";
import { MeasureType, ParamsList } from "../types/measure";

class ListController {
  async getList(req: Request, res: Response) {
    try {
      const customerCode = req.params.customer_code;
      const measureType = req.query.measure_type  as MeasureType | undefined;

      const params: ParamsList = {
        customer_code: customerCode,
        measure_type: measureType
      };

      const listService = new ListService();
      const result =  await listService.getList(params)
      res.status(200).json(result);
    } catch (error) {
      if ((error as any).statusCode === 400) {
        return res.status(400).json({
          error_code: "INVALID_TYPE",
          error_description: "Tipo de medição não permitida",
        });
      }
      if((error as any).statusCode === 404) {
        return res.status(404).json({
          error_code: "MEASURE_NOT_FOUND",
          error_description: "Nenhum registro encontrado.",
        });
      }
      res.status(500).json({
        error: "An error occurred while processing your request.",
      });
    }
  }
}

export default ListController;