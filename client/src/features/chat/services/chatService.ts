import axios from "axios"; 
import { apiClient } from "@/services/apiClient";
import { Conversation, Message, UploadFileResponse } from "../types";
import { ApiResponse } from "@/utils/ApiResponse";

// Define the shape of your backend Cloudinary token response signature
interface CloudinaryTokenData {
    signature: string;
    timestamp: number;
    folder: string;
    resourceType: string;
    api_key: string;
    cloud_name: string;
}

function getErrorMessage(error: unknown, fallback: string) {
    if (error instanceof Error) return error.message;
    return fallback;
}

export const chatService = {
    getRooms: async (): Promise<Conversation[]> => {
        try {
            const response = await apiClient.get<ApiResponse<Conversation[]>>('/chat/getAllChats');
            console.log("Rooms Response:", response.data);
            return response.data.data || [];
        } catch (error: unknown) {
            const message = getErrorMessage(error, 'تعذر تحميل المحادثات. يرجى المحاولة مرة أخرى.');
            console.error('Failed to fetch chat rooms inside chatService:', message);
            throw new Error(message);
        }
    },
    
    getRoomMessages: async (roomId: string): Promise<Message[]> => {
        try {
            const response = await apiClient.get<ApiResponse<Message[]>>(`/chat/getChatMessages/${roomId}`);
            return response.data.data || [];
        } catch (error: unknown) {
            const message = getErrorMessage(error, 'تعذر تحميل الرسائل. يرجى المحاولة مرة أخرى.');
            console.error('Failed to fetch messages for room inside chatService:', message);
            throw new Error(message);
        }
    },
    
    uploadChatFile: async (file: File, roomId: string, onProgress?: (progress: number) => void): Promise<UploadFileResponse> => {
        const fileExtension = file.name.split('.').pop() || '';
        try {
            // 1. FIXED: Added your uniform ApiResponse generic wrapper here
            const tokenResponse = await apiClient.post<ApiResponse<CloudinaryTokenData>>(
                `/chat/uploadChatFile/${roomId}`, 
                { fileType: fileExtension }
            );
            
            // 2. FIXED: Safely destructure keys directly from tokenResponse.data.data 
            const { signature, timestamp, folder, resourceType, api_key, cloud_name } = tokenResponse.data.data;

            if (!cloud_name) {
                throw new Error('Cloudinary cloud name is missing from upload signature.');
            }
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp.toString());
            formData.append('folder', folder);
            formData.append('api_key', api_key);
            
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/${resourceType}/upload`;
            
            const uploadResponse = await axios.post(cloudinaryUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    if (onProgress && progressEvent.total) {
                        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        onProgress(percentage);
                    }
                }
            });
            
            return {
                secureUrl: uploadResponse.data.secure_url,
                fileName: file.name
            };
        } catch (error: unknown) {
            const message = getErrorMessage(error, 'تعذر تحميل الملف. يرجى المحاولة مرة أخرى.');
            console.error('Failed to Upload File via chatService:', message);
            throw new Error(message);
        }
    },
    
    updateRoomReadStatus: async (roomId: string): Promise<void> => {
        try {
            await apiClient.patch<ApiResponse<void>>(`/chat/updateChatReadStatus/${roomId}`); 
            return;
        } catch (error: unknown) {
            const message = getErrorMessage(error, 'تعذر تحديث حالة القراءة. يرجى المحاولة مرة أخرى.');
            console.error('Failed to patch chat room status read inside chatService:', message);
            throw new Error(message);
        }
    }
};
