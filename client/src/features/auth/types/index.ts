
import Page from '../../../../.next/dev/types/routes.d';
export interface ApiResponse<T> {
   success: boolean; 
   message: string;
   data: T;
}

export interface UserProfile {
    id: string;
    FName: string;
    LName: string;
    phone: number;
    role: string;
}

export interface UserRegister {
    FName: string;
    LName: string;
    Email:string,
    SSN:string,
    Phone: number;
    Role: string;
    Password:string;
    ConfirmPassword:string;
}
export interface UserLogin{
    Email:string,
    Password:string,
}
