export interface ParentProfile {
  _id: string;
  UserId: string;
  ChildrenNumber: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateParentPayload {
  UserId: string;
  ChildrenNumber: number;
}

export interface UpdateParentPayload {
  ChildrenNumber: number;
}