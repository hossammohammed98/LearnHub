import { ApiResponse, UserRegister } from '../types/index';
import { apiClient } from '@/services/apiClient';

export const authService = {
    async registerUser(payload: UserRegister): Promise<ApiResponse<UserRegister>> {
        const response = await apiClient.post<ApiResponse<UserRegister>>('/auth/register', payload);
        return response.data; 
    }
};