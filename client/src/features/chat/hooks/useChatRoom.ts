'use client'
import { io } from 'socket.io-client';
import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "../types";
import { chatService } from "../services/chatService";

type CustomWebSocketClient = any;
interface UseChatRoomResult {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    uploadProgress: number;
    sendTextMessage: (text: string) => void;
    sendFileMessage: (file: File) => Promise<void>;
}

export function useChatRoom(roomId: string | null): UseChatRoomResult {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const socketRef = useRef<CustomWebSocketClient | null>(null);

    const loadChatHistory = useCallback(async (targetRoomId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await chatService.getRoomMessages(targetRoomId);
            setMessages(data);
            await chatService.updateRoomReadStatus(targetRoomId);
        } catch (error: any) {
            setError(error.message || 'تعذر تحميل تاريخ المحادثة.')
        } finally {
            setIsLoading(false);
        }

    }, []);
    const sendTextMessage = useCallback(async (text: string) => {
        if (!text.trim() || !roomId || !socketRef.current) return;
        const temporaryId = `temp-${Date.now()}`;
        const optimisticMessage: Message = {
            id: temporaryId,
            messageText: text,
            myMessage: true,
            time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, optimisticMessage]);
        socketRef.current.emit('send_message', {
            roomId,
            messageText: text
        });
    }, [roomId])
    const sendFileMessage = useCallback(async (file: File) => {
        if (!roomId) return;
        setUploadProgress(1);
        try {
            const uploadResult = await chatService.uploadChatFile(file, roomId, (progress) => {
                setUploadProgress(progress);
            });
            if (socketRef.current) {
                socketRef.current.emit('send_message', {
                    roomId,
                    messageText: `📎 ملف مرفق: ${uploadResult.fileName}`,
                    fileUrl: uploadResult.fileUrl,
                    type: 'file'
                });
            }

        } catch (error: any) {
            console.error("File upload operation failure context:", error.message);
        } finally {
            setTimeout(() => { setUploadProgress(0) }, 1000)
        }
    }, [roomId]);

    useEffect(() => {
        if (!roomId) {
            setMessages([]);
            return;
        }
        loadChatHistory(roomId);
        const socket=io(process.env.NEXT_PUBLIC_API_URL,{
            autoConnect:true,
            reconnectionAttempts:5,
            reconnectionDelay:1000,
            withCredentials:true,
            transports:["websocket"],
        });
        socketRef.current=socket;
       
        socketRef.current.emit('join_room', { roomId });
        socketRef.current.on('message_received', (incomingPayload: Message) => {
            setMessages((prev) => {
                if (prev.some((msg) => msg.id === incomingPayload.id)) return prev;
                return [...prev, incomingPayload];
            });
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.off('message_received');
                socketRef.current.emit('leave_room', { roomId });
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        }
    }, [roomId,loadChatHistory])

    return {
    messages,
    isLoading,
    error,
    uploadProgress,
    sendTextMessage,
    sendFileMessage
  };
}