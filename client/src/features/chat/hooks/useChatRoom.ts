'use client';

import { io, Socket } from 'socket.io-client';
import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "../types";
import { chatService } from "../services/chatService";
import { getSocketBaseUrl } from "@/services/runtimeConfig";

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

    const socketRef = useRef<Socket | null>(null);

    // 🎯 FIXED: Removed socketRef.current from dependencies. 
    // It's a ref, it always has the freshest value when called.
    const sendTextMessage = useCallback((text: string) => {
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
    }, [roomId]);

    // 🎯 FIXED: Removed socketRef.current from dependencies
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
        if (!roomId) return;

        let isActive = true;

        // 🎯 FIXED: Isolated the async history fetch cleanly
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
                if (isActive) setIsLoading(false);
            }
        })();

        // 🎯 FIXED: Clean initialization of socket without inline collisions
        const socket = io(getSocketBaseUrl(), {
            autoConnect: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            withCredentials: true,
            transports: ['polling', 'websocket'],
        });

        socketRef.current = socket;
        socket.emit('join_room', { roomId });

        socket.on('message_received', (incomingPayload: any) => {
            setMessages((prev) => {
                // 🎯 FIXED: Changed 'incomingMessage' to 'incomingPayload' to match parameters
                const exists = prev.some(
                    (msg) => msg.id === incomingPayload.id || (incomingPayload.clientRefId && msg.id === incomingPayload.clientRefId)
                );
                
                const processedPayload: Message = {
                    id: incomingPayload.id,
                    messageText: incomingPayload.messageText,
                    fileUrl: incomingPayload.fileUrl,
                    type: incomingPayload.type,
                    time: incomingPayload.time || new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
                    myMessage: incomingPayload.myMessage ?? false 
                };

                if (exists) {
                    return prev.map((msg) =>
                        // If it matches the temporary client ID or final ID, replace it with backend payload
                        msg.id === incomingPayload.clientRefId || msg.id === incomingPayload.id ? processedPayload : msg
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