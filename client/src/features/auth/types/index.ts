
export interface ApiResponse<T> {
   success: boolean; 
   message: string;
   data: T;
}

export interface UserProfile {
    id: string;
    FName: string;
    LName: string;
    Phone: string;
    Role: string;
}

export interface UserRegister {
    FName: string;
    LName: string;
    Email:string,
    SSN:string,
    Phone: string;
    Role: string;
    Password:string;
    ConfirmPassword:string;
}
export interface UserLogin{
    Email:string,
    Password:string,
}
