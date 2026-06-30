export type AuthUserPayload = {
  _id?: string;
  id?: string;
  FName: string;
  LName: string;
  Phone: string;
  Role: string;
  Email?: string;
  Avatar?: string;
};

export const normalizeAuthUser = (payload: AuthUserPayload) => ({
  id: payload.id || payload._id || "",
  FName: payload.FName,
  LName: payload.LName,
  Phone: payload.Phone,
  Role: payload.Role,
  Email: payload.Email,
  Avatar: payload.Avatar,
});
