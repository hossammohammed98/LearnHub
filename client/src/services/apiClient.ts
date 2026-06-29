import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 15000,
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        // 1. Check if the error is an expired token (401) and we haven't retried yet
        if (status === 401 && originalRequest && !(originalRequest as any)._retry) {
            (originalRequest as any)._retry = true;
            try {
                console.warn('🔄 Access Token expired. Attempting global refresh token handshake...');
                
                // Fire refresh call using vanilla axios instance
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {}, { withCredentials: true });
                
                // Retry the original request using our configured apiClient
                return apiClient(originalRequest);
            }
            catch (refreshError) {
                console.error('Session Completely Expired, Redirecting Connection To auth gateway');
                if (typeof window !== 'undefined') {
                    window.location.href = '/login?session_expired=true';
                }
                return Promise.reject(refreshError);
            }
        }
        
        // 2. FIXED: Every other error (including 500s) skips the refresh loop and goes straight here
        const specializeError = {
            // Extracts the message safely from your backend ApiResponse payload structure
            message: (error.response?.data as any)?.message || 'حدث خطأ غير متوقع في الاتصال.',
            status: status || 500,
            code: (error.response?.data as any)?.code || 'INTERNAL_SERVER_ERROR'
        };

        return Promise.reject(specializeError);
    }
);