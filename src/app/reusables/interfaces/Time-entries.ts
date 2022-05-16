export interface TimeEntries {
  id: number;
  project: { id: number, name: string };
  issue: { id: number };
  hours: number;
}
