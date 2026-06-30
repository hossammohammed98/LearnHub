export interface ParentChildUser {
  id: string;
  FName: string;
  LName: string;
  Email: string;
  Phone: string;
  Avatar?: string | null;
  Role: string;
}

export interface ParentChild {
  id: string;
  user: ParentChildUser;
  createdAt?: string;
}

export interface ParentOverview {
  parentId: string;
  userId: string;
  childrenNumber: number;
  children: ParentChild[];
}

export interface ParentApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AddChildPayload {
  FName: string;
  LName: string;
  Email: string;
  Phone: string;
  SSN: string;
  Password: string;
  ConfirmPassword: string;
}
