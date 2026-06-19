import type { Job } from "../types/jobs";
import { API_URL } from "./constants";

export async function getJobs(): Promise<Job[]> {
  const data = await fetch(`${API_URL}/jobs`);
  const res = await data.json();
  return res.data;
}