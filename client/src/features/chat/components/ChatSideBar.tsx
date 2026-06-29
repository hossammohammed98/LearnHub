"use client";

import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import ConversationList from './ConversationList';
import ConversationItem from './ConversationItem';
import { chatService } from '../services/chatService';
import { Conversation } from '../types';

interface ChatSideBarProps {
  onSelectChat: (id: string, name: string, img: string) => void;
  selectedChatId: string | null;
}

function ChatSideBar({ onSelectChat, selectedChatId }: ChatSideBarProps) {
  const [rooms, setRooms] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await chatService.getRooms();
        setRooms(data || []);
      } catch (err: any) {
        setError(err.message || 'حدث خطأ أثناء تحميل المحادثات.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

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