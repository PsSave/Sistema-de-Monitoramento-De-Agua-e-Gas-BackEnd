import { query } from "../database/db";
import { ConfirmedType } from "../types/measure";

class ConfirmService {
  async confirmData(data: ConfirmedType) {

    const queryData = await query('SELECT m.measure_value, m.measure_uuid, m.has_confirmed FROM measurements as m WHERE measure_uuid = $1',
      [data.measure_uuid])
    
    if(queryData.rows.length === 0) {
      const error = new Error("MEASURE_NOT_FOUND");
      (error as any).statusCode = 404;
      throw error;
    }
    if(queryData.rows[0].has_confirmed) {
      const error = new Error("CONFIRMATION_DUPLICATE");
      (error as any).statusCode = 409;
      throw error;
    }

    await query(
      'UPDATE measurements SET has_confirmed = TRUE, measure_value = $1 WHERE measure_uuid = $2',
      [data.confirmed_value, data.measure_uuid]
    );

    return {
      success: true
    }
  }
}

export default ConfirmService;