export type MeasureType = "WATER" | "GAS";

export type ConfirmedType = {
  measure_uuid: string,
  confirmed_value: number
}

export interface MeasureRequest {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
}

export type ParamsList = {
  customer_code: string;
  measure_type?: MeasureType;
}
