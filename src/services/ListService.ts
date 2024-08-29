import { query } from "../database/db";
import { MeasureType, ParamsList } from "../types/measure";

interface Measure {
  measure_uuid: string,
  measure_datetime: Date,
  measure_type: MeasureType,
  has_confirmed: boolean,
  image_url: string
}

class ListService {
  async getList(params: ParamsList) {
    const { customer_code, measure_type } = params;

    let validatedMeasureType: MeasureType | undefined = undefined;
    if (measure_type) {
      const normalizedType = measure_type.toUpperCase();
      if (normalizedType === "WATER" || normalizedType === "GAS") {
        validatedMeasureType = normalizedType as MeasureType;
      } else {
        const error = new Error("INVALID_TYPE");
        (error as any).statusCode = 400;
        throw error;
      }
    }
    const queryText = validatedMeasureType
    ? 'SELECT * FROM measurements WHERE customer_code = $1 AND measure_type = $2'
    : 'SELECT * FROM measurements WHERE customer_code = $1';

    const queryParams = measure_type ? [customer_code, validatedMeasureType] : [customer_code];

    const result = await query(queryText, queryParams);

    if(result.rowCount === 0) {
      const error = new Error("MEASURES_NOT_FOUND");
      (error as any).statusCode = 404;
      throw error;
    }

    const measures: Measure[] = result.rows.map((row: any) => ({
      measure_uuid: row.measure_uuid,
      measure_datetime: new Date(row.measure_datetime),
      measure_type: row.measure_type as MeasureType,
      has_confirmed: row.has_confirmed,
      image_url: row.image_url
    }));

    return {
      customer_code,
      measures
    }

  }
}

export default ListService;