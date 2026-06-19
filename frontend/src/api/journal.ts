import type { JournalData } from "../types/journal";
import { API_URL } from "./constants";

export async function getJournals(): Promise<JournalData[]> {
  const data = await fetch(`${API_URL}/journal`);
  const res = await data.json();
  return res.data;
}

export async function addJournal(journal: JournalData) {
  const data = await fetch(`${API_URL}/journal`, {
    method: "POST",
    body: JSON.stringify(journal),
  });
  const res = await data.json();
  return res.data;
}

export async function updateJournal(id: number, journal: JournalData) {
  const data = await fetch(`${API_URL}/journal/${id}`, {
    method: "PUT",
    body: JSON.stringify(journal),
  });
  const res = await data.json();
  return res.data;
}

export async function deleteJournal(id: number) {
  const data = await fetch(`${API_URL}/journal/${id}`, { method: "DELETE" });
  const res = await data.json();
  return res.data;
}