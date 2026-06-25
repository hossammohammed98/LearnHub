import { apiClient } from "@/services/apiClient";
import { Conversation, Message, UploadFileResponse } from "../types";

export const chatService={
    getRooms: async(): Promise<Conversation[]> => {
        try{
            const response=await apiClient.get<{data:Conversation[]}>('/chats');
            return response.data.data;
        }
        catch(error:any){
            console.error('Failed to fetch chat rooms inside chatService:', error.message);
            throw new Error(error?.response?.data?.message || 'تعذر تحميل المحادثات. يرجى المحاولة مرة أخرى.');
        }
    },
    getRoomMessages:async(roomId:string):Promise<Message[]>=>{
        try{
            const response =await apiClient.get<{data:Message[]}>(`/chatMessage/${roomId}`)
            return response.data.data;
        }
        catch(error:any){
            console.error('Failed to fetch messages for room inside chatService:', error.message);
            throw new Error(error?.response?.data?.message || 'تعذر تحميل الرسائل. يرجى المحاولة مرة أخرى.');
        }
    },
    uploadChatFile:async(file:File,roomId:string,onProgress?:(progress:number)=>void):Promise<UploadFileResponse>=>{
        try{
            const response =await apiClient.post<{data:UploadFileResponse}>(
                `/uploadChatFile/${roomId}`,
                FormData,{
                    headers:{
                        'Content-Type':'multipart/form-data',
                    },
                    onUploadProgress:(progressEvent)=>{
                        if(onProgress&&progressEvent.total){
                            const percentage=Math.round(progressEvent.loaded*100/progressEvent.total);
                            onProgress(percentage);
                        }
                    }
                })
            return response.data.data;
        }
        catch(error:any){
            console.error('Failed to Upload File messages for room inside chatService:', error.message);
            throw new Error(error?.response?.data?.message || 'تعذر تحميل الملف. يرجى المحاولة مرة أخرى.');
        }
    },
    updateRoomReadStatus:async (roomId:string):Promise<void>=>{
        try{
            const response=await apiClient.patch<void>(`/updateChatReadStatus/${roomId}`)
            return;
        }
        catch(error:any){
            console.error('Failed to patch chat room status read inside chatService:', error.message);
            throw new Error(error?.response?.message || 'تعذر تحديث حالة القراءة. يرجى المحاولة مرة أخرى.');
        }
    }

};