import { ApiResponse, UserRegister ,UserLogin,UserProfile} from '../types/index';
import { apiClient } from '@/services/apiClient';

export const authService = {
     registerUser: async(payload: UserRegister): Promise<ApiResponse<UserProfile> & { accessToken?: string | null }> => {
        const response = await apiClient.post('/auth/register', payload);
        const payloadData = response.data?.data ?? response.data;

        return {
            success: response.data?.success ?? true,
            message: response.data?.message ?? '',
            data: payloadData,
            accessToken: payloadData?.accessToken ?? null,
        };
    },
     loginUser: async(payload: UserLogin): Promise<ApiResponse<UserProfile> & { accessToken?: string | null }> => {
        const response = await apiClient.post('/auth/login', payload);
        const payloadData = response.data?.data ?? response.data;

        return {
            success: response.data?.success ?? true,
            message: response.data?.message ?? '',
            data: payloadData,
            accessToken: payloadData?.accessToken ?? null,
        };
    }
};