import {Issue} from './Issue';

export interface Version {
  liste: Issue[];
  id: number;
  project: { id?: number, name?: string };
  name: string;
  description?: string;
  status?: string;
  due_date?: Date;
  sharing?: string;
  wiki_page_title?: string;
  estimated_hours: number;
  spent_hours: number;
  created_on?: Date;
  updated_on?: Date;


}
