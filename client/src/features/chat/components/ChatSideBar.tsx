"use client";

import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import ConversationList from './ConversationList';
import ConversationItem from './ConversationItem';
import { chatService } from '../services/chatService';
import { Conversation } from '../types';
import { io } from 'socket.io-client';
import { getSocketBaseUrl } from '@/services/runtimeConfig';
import { useAuthStore } from '@/store/useAuthStore';

interface ChatSideBarProps {
  onSelectChat: (id: string, name: string, img: string) => void;
  selectedChatId: string | null;
}

function ChatSideBar({ onSelectChat, selectedChatId }: ChatSideBarProps) {
  const [rooms, setRooms] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await chatService.getRooms();
        setRooms(data || []);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'حدث خطأ أثناء تحميل المحادثات.';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchRooms();

    if (!accessToken) return;

    const socket = io(getSocketBaseUrl(), {
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      withCredentials: true,
      transports: ['polling', 'websocket'],
      auth: accessToken ? { token: `Bearer ${accessToken}` } : undefined,
      extraHeaders: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    });

    const handleIncomingMessage = (payload: Record<string, unknown>) => {
      const roomId = (payload.chatId ?? payload.roomId)?.toString();
      if (!roomId) return;

      const normalizedText = (payload.messageText ?? payload.content ?? '').toString().trim();
      const attachmentFileUrl = payload.fileUrl ?? (payload.attachment as { fileUrl?: string } | undefined)?.fileUrl;
      const isAttachment = payload.type === 'file' || payload.messageType === 'file' || Boolean(attachmentFileUrl);
      const fileName = (payload.attachment as { fileName?: string } | undefined)?.fileName || payload.fileName?.toString();
      const previewText = isAttachment
        ? (normalizedText || (fileName ? `📎 ملف مرفق: ${fileName}` : '📎 ملف مرفق'))
        : normalizedText || 'رسالة جديدة';
      const previewTime = payload.time || new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

      setRooms((prevRooms) => {
        const roomIndex = prevRooms.findIndex((room) => room.id === roomId);
        if (roomIndex === -1) return prevRooms;

        const updatedRoom = {
          ...prevRooms[roomIndex],
          lastMessage: previewText,
          time: previewTime,
        };

        const nextRooms = [...prevRooms];
        nextRooms.splice(roomIndex, 1);
        return [updatedRoom, ...nextRooms];
      });
    };

    socket.on('message_received', handleIncomingMessage);

    return () => {
      socket.off('message_received', handleIncomingMessage);
      socket.disconnect();
    };
  }, [accessToken]);

  const filteredRooms = rooms.filter((room) =>
    room.userName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='w-full md:w-80 border-l border-slate-100 bg-white flex flex-col h-full' dir="rtl">
      <div className='p-4 border-b border-slate-50 flex flex-col gap-3'>
        <h1 className='text-xl font-bold text-slate-800'>المحادثات</h1>
        <SearchBar 
          placeholder='البحث عن محادثات...' 
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
      </div>

      <ConversationList>
        {isLoading && (
          <p className="text-center text-xs text-slate-400 p-4">جاري تحميل المحادثات...</p>
        )}

        {error && (
          <p className="text-center text-xs text-red-500 p-4">{error}</p>
        )}
        
        {!isLoading && filteredRooms.length === 0 && (
          <p className="text-center text-xs text-slate-400 p-4">لا توجد محادثات مطابقة.</p>
        )}

        {!isLoading && filteredRooms.map((room) => (
          <ConversationItem
            key={room.id}
            userName={room.userName}
            imgUrl={room.imgUrl}
            lastMessage={room.lastMessage}
            time={room.time}
            active={selectedChatId === room.id}
            onClick={() => onSelectChat(
              room.id, 
              room.userName || "مستودع المحادثة", 
              room.imgUrl || "/images/login.jpg"
            )}
          />
        ))}
      </ConversationList>
    </div>
  );
}

export default ChatSideBar;