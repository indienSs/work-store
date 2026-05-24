import type { MeasureUnit } from "../types/measureUnits";

export async function getMeasureUnits(): Promise<MeasureUnit[]> {
  const data = await fetch('http://localhost:3000/measure-units');
  const res = await data.json();
  return res.data;
}