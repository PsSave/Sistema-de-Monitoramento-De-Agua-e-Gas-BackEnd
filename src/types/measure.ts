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
