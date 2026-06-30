'use client';

import { io, Socket } from 'socket.io-client';
import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "../types";
import { chatService } from "../services/chatService";
import { getSocketBaseUrl } from "@/services/runtimeConfig";
import { useAuthStore } from "@/store/useAuthStore";

interface UseChatRoomResult {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    uploadProgress: number;
    sendTextMessage: (text: string) => void;
    sendFileMessage: (file: File) => Promise<void>;
}

type ChatMessagePayload = {
    id?: string;
    _id?: string;
    chatId?: string;
    roomId?: string;
    messageText?: string;
    content?: string;
    type?: 'text' | 'file';
    messageType?: 'text' | 'file';
    fileUrl?: string;
    fileName?: string;
    attachment?: {
        fileUrl?: string;
        fileName?: string;
        fileSize?: string;
    };
    senderId?: string;
    myMessage?: boolean;
    time?: string;
    clientRefId?: string;
};

export function useChatRoom(roomId: string | null): UseChatRoomResult {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const socketRef = useRef<Socket | null>(null);
    const currentUserId = useAuthStore((state) => state.user?.id);
    const accessToken = useAuthStore((state) => state.accessToken);

    const normalizeMessagePayload = useCallback((payload: ChatMessagePayload): Message => {
        const normalizedType = payload.type ?? payload.messageType ?? (payload.fileUrl || payload.attachment?.fileUrl ? 'file' : 'text');
        const normalizedMessageText = payload.messageText ?? payload.content ?? '';
        const normalizedFileUrl = payload.fileUrl ?? payload.attachment?.fileUrl ?? undefined;
        const normalizedFileName = payload.fileName ?? payload.attachment?.fileName ?? undefined;
        const normalizedMyMessage = payload.myMessage ?? (payload.senderId?.toString() === currentUserId?.toString()) ?? false;

        return {
            id: payload.id ?? payload._id,
            messageText: normalizedMessageText,
            myMessage: normalizedMyMessage,
            time: payload.time || new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
            type: normalizedType,
            fileUrl: normalizedFileUrl,
            fileName: normalizedFileName,
            attachment: payload.attachment,
        };
    }, [currentUserId]);

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
            clientRefId: temporaryId,
            senderId: currentUserId,
        });
    }, [roomId, currentUserId]);

    // 🎯 FIXED: Removed socketRef.current from dependencies
    const sendFileMessage = useCallback(async (file: File) => {
        if (!roomId || !socketRef.current) return;
        setUploadProgress(1);
        const temporaryId = `temp-file-${Date.now()}`;
        try {
            const uploadResult = await chatService.uploadChatFile(file, roomId, (progress) => {
                setUploadProgress(progress);
            });

            const optimisticFileMessage: Message = {
                id: temporaryId,
                messageText: `📎 ملف مرفق: ${uploadResult.fileName}`,
                myMessage: true,
                time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
                type: 'file',
                fileUrl: uploadResult.secureUrl,
                fileName: uploadResult.fileName,
                attachment: {
                    fileUrl: uploadResult.secureUrl,
                    fileName: uploadResult.fileName,
                },
            };

            setMessages((prev) => [...prev, optimisticFileMessage]);

            socketRef.current.emit('send_message', {
                roomId,
                messageText: optimisticFileMessage.messageText,
                fileUrl: uploadResult.secureUrl,
                fileName: uploadResult.fileName,
                type: 'file',
                senderId: currentUserId,
                clientRefId: temporaryId,
            });
        } catch (err: unknown) {
            console.error("File upload operation failure context:", err instanceof Error ? err.message : err);
        } finally {
            setTimeout(() => { setUploadProgress(0); }, 1000);
        }
    }, [roomId, currentUserId]);

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

                setMessages((data || []).map(normalizeMessagePayload));
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
            auth: accessToken ? { token: `Bearer ${accessToken}` } : undefined,
            extraHeaders: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
        });

        socketRef.current = socket;
        socket.emit('join_room', { roomId });

        socket.on('message_received', (incomingPayload: ChatMessagePayload) => {
            setMessages((prev) => {
                // 🎯 FIXED: Changed 'incomingMessage' to 'incomingPayload' to match parameters
                const exists = prev.some(
                    (msg) => msg.id === incomingPayload.id || (incomingPayload.clientRefId && msg.id === incomingPayload.clientRefId)
                );
                
                const processedPayload = normalizeMessagePayload(incomingPayload);

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
    }, [roomId, currentUserId, accessToken, normalizeMessagePayload]);

    return {
        messages: roomId ? messages : [],
        isLoading,
        error,
        uploadProgress,
        sendTextMessage,
        sendFileMessage
    };
}
