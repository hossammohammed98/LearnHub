'use client';

import { io, Socket } from 'socket.io-client';
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

    // 🎯 FIXED: Strongly typed standard Socket client instead of 'any'
    const socketRef = useRef<Socket | null>(null);

    const sendTextMessage = useCallback(async (text: string) => {
        console.log("🔍 sendTextMessage triggered. Socket status:", !!socketRef.current);
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
            clientRefId: temporaryId
        });
    }, [roomId,socketRef.current]);

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
    }, [roomId,socketRef.current]);

    useEffect(() => {
        if (!roomId) {
            return;
        }

        loadChatHistory(roomId);

        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', {
        
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
            transports: ['polling',"websocket"],
        });

        socketRef.current = socket;

        socket.emit('join_room', { roomId });

        socket.on('message_received', (incomingPayload: any) => {
            setMessages((prev) => {
                const exists = prev.some(
                    (msg) => msg.id === incomingMessage.id || (incomingMessage.clientRefId && msg.id === incomingMessage.clientRefId)
                );
                
                // 🎯 FIXED: Use incomingPayload.myMessage directly from the backend, 
                // or fallback cleanly without checking undefined client query objects.
                const processedPayload: Message = {
                    id: incomingPayload.id,
                    messageText: incomingPayload.messageText,
                    fileUrl: incomingPayload.fileUrl,
                    type: incomingPayload.type,
                    time: incomingPayload.time || new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
                    // If the backend says true, or if it has your current client user id context
                    myMessage: incomingPayload.myMessage ?? false 
                };

                if (exists) {
                    // 🎯 FIXED: Correctly mapped to replace the matching optimistic item with 'processedPayload'
                    return prev.map((msg) =>
                        msg.id === incomingPayload.clientRefId ? processedPayload : msg
                    );
                }
                return [...prev, processedPayload];
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