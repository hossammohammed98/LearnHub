'use client';

import { io, type Socket } from 'socket.io-client';
import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "../types";
import { chatService } from "../services/chatService";
import { getSocketBaseUrl } from "@/services/runtimeConfig";

type CustomWebSocketClient = Socket;
type IncomingMessagePayload = Message & { clientRefId?: string };
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
        } catch (err: unknown) {
            console.error("File upload operation failure context:", err instanceof Error ? err.message : err);
        } finally {
            setTimeout(() => { setUploadProgress(0); }, 1000);
        }
    }, [roomId]);

    useEffect(() => {
        if (!roomId) {
            return;
        }
        
        let isActive = true;
        void (async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await chatService.getRoomMessages(roomId);
                if (!isActive) return;

                setMessages(data);
                await chatService.updateRoomReadStatus(roomId);
            } catch (err: unknown) {
                if (!isActive) return;
                setError(err instanceof Error ? err.message : 'تعذر تحميل تاريخ المحادثة.');
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        })();
        
        const socket = io(getSocketBaseUrl(), {
            autoConnect: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            withCredentials: true,
            transports: ["websocket"],
        });
        
        socketRef.current = socket;

        socket.emit('join_room', { roomId });
        
        socket.on('message_received', (incomingPayload: unknown) => {
            const incomingMessage = incomingPayload as IncomingMessagePayload;
            setMessages((prev) => {
                // 4. SMART DUPLICATE CHECK: Swap out the matching temporary optimistic item
                const exists = prev.some(
                    (msg) => msg.id === incomingMessage.id || (incomingMessage.clientRefId && msg.id === incomingMessage.clientRefId)
                );
                
                if (exists) {
                    return prev.map((msg) => 
                        msg.id === incomingMessage.clientRefId ? incomingMessage : msg
                    );
                }
                return [...prev, incomingMessage];
            });
        });

        return () => {
            isActive = false;
            socket.off('message_received');
            socket.emit('leave_room', { roomId });
            socket.disconnect();
            socketRef.current = null;
        };
    }, [roomId]);

    return {
        messages: roomId ? messages : [],
        isLoading,
        error,
        uploadProgress,
        sendTextMessage,
        sendFileMessage
    };
}