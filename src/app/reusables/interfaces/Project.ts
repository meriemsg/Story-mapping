export interface Project {
  id?: number;
  name?: string;
  identifier?: string;
  description?: string;
  status?: number;
  parent: {
    id?: number,
    name?: string
  };
  isPublic?: boolean;
  inheritMembers?: boolean;
  createdOn?: Date;
  updatedOn?: Date;
}
