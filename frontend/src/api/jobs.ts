import type { Job } from "../types/jobs";

export async function getJobs(): Promise<Job[]> {
  const data = await fetch('http://localhost:3000/jobs');
  const res = await data.json();
  return res.data;
}