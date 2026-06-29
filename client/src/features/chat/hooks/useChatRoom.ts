'use client';

import { io } from 'socket.io-client';
import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "../types";
import { chatService } from "../services/chatService";
import { getSocketBaseUrl } from "@/services/runtimeConfig";

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
        } catch (err: any) {
            setError(err.message || 'تعذر تحميل تاريخ المحادثة.');
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
            messageText: text,
            clientRefId: temporaryId // 3. Pass a reference ID so the backend can echoes it back
        });
    }, [roomId]);

    const sendFileMessage = useCallback(async (file: File) => {
        if (!roomId || !socketRef.current) return;
        setUploadProgress(1);
        try {
            const uploadResult = await chatService.uploadChatFile(file, roomId, (progress) => {
                setUploadProgress(progress);
            });
            
            socketRef.current.emit('send_message', {
                roomId,
                messageText: `📎 ملف مرفق: ${uploadResult.fileName}`,
                fileUrl: uploadResult.secureUrl,
                type: 'file'
            });
        } catch (err: any) {
            console.error("File upload operation failure context:", err.message);
        } finally {
            setTimeout(() => { setUploadProgress(0); }, 1000);
        }
    }, [roomId]);

    useEffect(() => {
        if (!roomId) {
            setMessages([]);
            return;
        }
        
        loadChatHistory(roomId);
        
        const socket = io(getSocketBaseUrl(), {
            autoConnect: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            withCredentials: true,
            transports: ["websocket"],
        });
        
        socketRef.current = socket;

        socket.emit('join_room', { roomId });
        
        socket.on('message_received', (incomingPayload: any) => {
            setMessages((prev) => {
                // 4. SMART DUPLICATE CHECK: Swap out the matching temporary optimistic item
                const exists = prev.some(
                    (msg) => msg.id === incomingPayload.id || (incomingPayload.clientRefId && msg.id === incomingPayload.clientRefId)
                );
                
                if (exists) {
                    return prev.map((msg) => 
                        msg.id === incomingPayload.clientRefId ? incomingPayload : msg
                    );
                }
                return [...prev, incomingPayload];
            });
        });

        return () => {
            socket.off('message_received');
            socket.emit('leave_room', { roomId });
            socket.disconnect();
            socketRef.current = null;
        };
    }, [roomId, loadChatHistory]);

    return {
        messages,
        isLoading,
        error,
        uploadProgress,
        sendTextMessage,
        sendFileMessage
    };
}