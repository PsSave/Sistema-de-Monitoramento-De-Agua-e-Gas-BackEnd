export type MeasureType = "WATER" | "GAS";

export interface MeasureRequest {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
}
