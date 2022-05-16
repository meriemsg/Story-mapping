export interface Issue {
  id: number;
  project: { id: number, name: string };
  tracker: { id: number, name: string };
  status: { id: number, name: string };
  priority: { id: number, name: string };
  author: { id: number, name: string };
  assigned_to: { id: number, name: string };
  category?: { id?: number, name?: string };
  fixed_version?: { id?: number, name?: string };
  subject: string;
  description?: string;
  start_date?: Date;
  due_date?: Date;
  is_private?: boolean;
  estimated_hours?: number;
  spent_hours?: number;
  done_ratio?: number;
  category_id: string;
  fixed_version_id: string;
}
