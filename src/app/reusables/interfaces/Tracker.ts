export interface Tracker {
  id?: number;
  name?: string;
  default_status: {
    id?: number;
    name?: string;
  };
  description?: string;
}
