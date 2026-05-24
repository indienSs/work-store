import type { JournalData } from "../types/journal";

export async function getJournals(): Promise<JournalData[]> {
  const data = await fetch('http://localhost:3000/journal');
  const res = await data.json();
  return res.data;
}

export async function addJournal(journal: JournalData) {
  const data = await fetch('http://localhost:3000/journal', {
    method: "POST",
    body: JSON.stringify(journal),
  });
  const res = await data.json();
  return res.data;
}

export async function updateJournal(id: number, journal: JournalData) {
  const data = await fetch(`http://localhost:3000/journal/${id}`, {
    method: "PUT",
    body: JSON.stringify(journal),
  });
  const res = await data.json();
  return res.data;
}

export async function deleteJournal(id: number) {
  const data = await fetch(`http://localhost:3000/journal/${id}`, { method: "DELETE" });
  const res = await data.json();
  return res.data;
}