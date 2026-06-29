import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const apiClient: AxiosInstance = axios.create({
    // FIXED: Points relatively to the Next.js rewritten route to completely eliminate port conflicts
    baseURL: '/api/v1', 
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

        if (status === 401 && originalRequest && !(originalRequest as any)._retry) {
            (originalRequest as any)._retry = true;
            try {
                console.warn('🔄 Access Token expired. Attempting global refresh token handshake...');
                
                await axios.post('/api/v1/auth/refresh-token', {}, { withCredentials: true });
                
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
        
        // Structured error return mapping
        const customError = new Error((error.response?.data as any)?.message || 'حدث خطأ غير متوقع في الاتصال بالمخدم.');
        (customError as any).status = status || (error.code === 'ECONNREFUSED' ? 503 : 500);
        (customError as any).code = (error.response?.data as any)?.code || error.code || 'NETWORK_ERROR';

        return Promise.reject(customError);
    }
);