'use client'
import ChatSideBar from '@/features/chat/components/ChatSideBar';
import ChatWindow from '@/features/chat/components/ChatWindow';
import { getRoleHome } from '@/features/auth/utils/roleRoutes';
import { useAuthStore } from '@/store/useAuthStore';
import { BookOpen, Home, Settings } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

function ChatLayout() {
  const [selectedChatId,setSelectedChatId]=useState<string|null>(null);
  const [activeChatName, setActiveChatName] = useState("المحادثة");
  const [activeChatImg, setActiveChatImg] = useState("/images/login.jpg");
  const user = useAuthStore((state) => state.user);
  const homeHref = getRoleHome(user?.Role);

  const handleSelectChat = (id: string, name: string, img: string) => {
    setSelectedChatId(id);
    setActiveChatName(name);
    setActiveChatImg(img);
  };

  return (
    <div className='flex h-screen w-full flex-col overflow-hidden bg-[#F8FAFC]' dir="rtl">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-6">
        <div>
          <h1 className="text-base font-bold text-slate-900">الرسائل</h1>
          <p className="text-xs text-slate-400">محادثات المنصة</p>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link href={homeHref} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">الرئيسية</span>
          </Link>
          <Link href={user?.Role === "Student" ? "/MyCourses" : "/teacher"} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">الدورات</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">الإعدادات</span>
          </Link>
        </nav>
      </header>

      <div className='flex min-h-0 flex-1 overflow-hidden'>
           <div className={`w-full md:w-80 h-full flex-shrink-0 ${selectedChatId ? 'hidden md:block' : 'block'}`}>
          <ChatSideBar onSelectChat={handleSelectChat} selectedChatId={selectedChatId} />
          </div>
          <div className={`w-full md:flex-1 h-full ${selectedChatId ? 'block' : 'hidden md:block'}`}>
          <ChatWindow
            selectedChatId={selectedChatId}
            chatName={activeChatName}
            chatImg={activeChatImg}
            onBack={() => setSelectedChatId(null)}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatLayout
