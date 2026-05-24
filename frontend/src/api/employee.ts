import type { Employee } from "../types/employee";

export async function getEmployees(): Promise<Employee[]> {
  const data = await fetch('http://localhost:3000/employees');
  const res = await data.json();
  return res.data;
}