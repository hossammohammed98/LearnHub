import { apiClient } from "@/services/apiClient";
import { Conversation, Message, UploadFileResponse } from "../types";

export const chatService = {
    getRooms: async (): Promise<Conversation[]> => {
        try {
            const response = await apiClient.get<{ data: Conversation[] }>('/api/v1/chat/getAllChats');
            return response.data.data;
        }
        catch (error: any) {
            console.error('Failed to fetch chat rooms inside chatService:', error.message);
            throw new Error(error?.response?.data?.message || 'تعذر تحميل المحادثات. يرجى المحاولة مرة أخرى.');
        }
    },
    getRoomMessages: async (roomId: string): Promise<Message[]> => {
        try {
            const response = await apiClient.get<{ data: Message[] }>(`/api/v1/chat/getChatMessages/${roomId}`)
            return response.data.data;
        }
        catch (error: any) {
            console.error('Failed to fetch messages for room inside chatService:', error.message);
            throw new Error(error?.response?.data?.message || 'تعذر تحميل الرسائل. يرجى المحاولة مرة أخرى.');
        }
    },
    uploadChatFile: async (file: File, roomId: string, onProgress?: (progress: number) => void): Promise<UploadFileResponse> => {
        const fileExtension = file.name.split('.').pop() || '';
        try {
            const tokenResponse = await apiClient.post(`/api/v1/chat/uploadChatFile/${roomId}`, { fileType: fileExtension });
            const { signature, timestamp, folder, resourceType, api_key } = tokenResponse.data;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp.toString());
            formData.append('folder', folder);
            formData.append('api_key', api_key);
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;
            const uploadResponse = await apiClient.post(cloudinaryUrl, formData, {
                onUploadProgress: (progressEvent) => {
                    if (onProgress && progressEvent.total) {
                        const percentage = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                        onProgress(percentage);
                    }
                }
            })
            return {
                secureUrl: uploadResponse.data.secure_url,
                fileName: file.name
            }
        }
        catch (error: any) {
            console.error('Failed to Upload File messages for room inside chatService:', error.message);
            throw new Error(error?.response?.data?.message || 'تعذر تحميل الملف. يرجى المحاولة مرة أخرى.');
        }
    },
    updateRoomReadStatus: async (roomId: string): Promise<void> => {
        try {
            const response = await apiClient.patch<void>(`/updateChatReadStatus/${roomId}`)
            return;
        }
        catch (error: any) {
            console.error('Failed to patch chat room status read inside chatService:', error.message);
            throw new Error(error?.response?.message || 'تعذر تحديث حالة القراءة. يرجى المحاولة مرة أخرى.');
        }
    }

};