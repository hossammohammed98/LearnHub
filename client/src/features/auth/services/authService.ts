import { ApiResponse, UserRegister ,UserLogin,UserProfile} from '../types/index';
import { apiClient } from '@/services/apiClient';

export const authService = {
     registerUser:async(payload: UserRegister): Promise<ApiResponse<UserProfile>>=> {
        console.log(payload);
        const response = await apiClient.post<ApiResponse<UserProfile>>('/auth/register', payload);
        console.log(response);
        return response.data; 
    },
     loginUser:async(payload:UserLogin):Promise<ApiResponse<UserProfile>>=>{
        const response=await apiClient.post<ApiResponse<UserProfile>>('/auth/login',payload);
        return response.data;
    }
};