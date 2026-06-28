export interface ApiResponse<T>{
   success:string,
   message:string,
   data:T,
}
export interface UserRegister{
    id:string,
    FName:string,
    LName:string,
    phone:number,
    role:string,
}

