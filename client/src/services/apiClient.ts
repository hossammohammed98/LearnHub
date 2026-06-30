import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getApiBaseUrl } from './runtimeConfig';
import { useAuthStore } from '@/store/useAuthStore';

export const apiClient: AxiosInstance = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 15000,
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = useAuthStore.getState().accessToken;
        const requestUrl = config.url || '';
        const isAuthRoute = requestUrl.startsWith('/auth/');

        if (accessToken && !config.headers?.Authorization && !isAuthRoute) {
            config.headers = {
                ...(config.headers || {}),
                Authorization: `Bearer ${accessToken}`,
            };
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
        const status = error.response?.status;

        // 1. Check if the error is an expired token (401) and we haven't retried yet
        if (status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                console.warn('🔄 Access Token expired. Attempting global refresh token handshake...');
                
                // Fire refresh call using vanilla axios instance
                const refreshResponse = await axios.post('/auth/refresh-token', {}, {
                    baseURL: getApiBaseUrl(),
                    withCredentials: true
                });
                const refreshedToken = refreshResponse?.data?.data ?? refreshResponse?.data;

                if (typeof refreshedToken === 'string' && refreshedToken) {
                    useAuthStore.getState().setAccessToken(refreshedToken);
                }
                
                return apiClient(originalRequest);
            }
            catch (refreshError) {
                console.error('Session Completely Expired, Redirecting Connection To auth gateway');
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth-storage');
                    if (window.location.pathname !== '/login') {
                        window.location.replace('/login?session_expired=true');
                    }
                }
                return Promise.reject(refreshError);
            }
        }
        
        // 2. FIXED: Every other error (including 500s) skips the refresh loop and goes straight here
        const responseData = error.response?.data as { message?: string; code?: string } | undefined;
        const message = responseData?.message || 'حدث خطأ غير متوقع في الاتصال.';
        const specializedError = Object.assign(new Error(message), {
            status: status || 500,
            code: responseData?.code || 'INTERNAL_SERVER_ERROR'
        });

        return Promise.reject(specializedError);
    }
);

export default apiClient;
