import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
export const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 15000,
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
})

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response)=>response,
    async(error:AxiosError)=>{
        const originalRequest=error.config;
        if(error.response?.status&&originalRequest&&!(originalRequest as any)._retry){
            (originalRequest as any)._retry=true;
            try{
                console.warn('🔄 Access Token expired. Attempting global refresh token handshake...');
            await axios.post(`process.env.NEXT_PUBLIC_API_URL/auth/refresh-token`,{},{withCredentials:true});
            return apiClient(originalRequest);
            }
            catch(refreshError){
                console.error('Session Completely Expired, Redirection Connection To auth getaway');
                if(typeof window!==undefined){
                    window.location.href='/login?session_expired=true'
                }
                return Promise.reject(refreshError);
            }
        }
        const specializeError={
            message:(error.response?.data as any)?.message||'حدث خطأ غير متوقع في الاتصال.',
            status:error.response?.status || 500,
            code:(error.response?.data as any)?.code || 'INTERNAL_SERVER_ERROR'
        };
        return Promise.reject(specializeError);
    }
     
);