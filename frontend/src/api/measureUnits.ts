import type { MeasureUnit } from "../types/measureUnits";
import { API_URL } from "./constants";

export async function getMeasureUnits(): Promise<MeasureUnit[]> {
  const data = await fetch(`${API_URL}/measure-units`);
  const res = await data.json();
  return res.data;
}