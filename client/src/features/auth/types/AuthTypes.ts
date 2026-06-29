//user
export interface User {
  id: string;
  FName: string;
  LName: string;
  Email: string;
  SSN: string;
  Phone: string;
  Role: "Student" | "Teacher" | "Parent";
  Avatar?: string;
  isVerified?: boolean;
}
// response from server login/register
export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

//register
export interface RegisterCredentials {
  FName: string;
  LName: string;
  Email: string;
  SSN?: string;
  Password: string;
  Phone: string;
  Role: "Student" | "Teacher" | "Parent";
  Avatar?: string;
}

//login
export interface LoginCredentials {
  Email: string;
  Password: string;
}
//tokent for reset password
export interface ResetPasswordCredentials {
  token: string;
  newPassword: string;
}
