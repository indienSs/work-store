import type { Employee } from "../types/employee";
import { API_URL } from "./constants";

export async function getEmployees(): Promise<Employee[]> {
  const data = await fetch(`${API_URL}/employees`);
  const res = await data.json();
  return res.data;
}