'use client'
import SideBar from '@/components/common/SideBar'
import ChatSideBar from '@/features/chat/components/ChatSideBar';
import ChatWindow from '@/features/chat/components/ChatWindow';
import React, { useState } from 'react'

function ChatLayout() {
  const [selectedChatId,setSelectedChatId]=useState<string|null>(null);
  return (
    <div className='flex h-screen w-full overflow-hidden bg-[#F8FAFC]' dir="rtl">
      <div className={`  md:block h-full`}>
        <SideBar />
      </div>
      <div className='flex flex-1 overflow-hidden'>
           <div className={`w-full md:w-80 h-full flex-shrink-0 ${selectedChatId ? 'hidden md:block' : 'block'}`}>
          <ChatSideBar onSelectChat={(id) => setSelectedChatId(id)} selectedChatId={selectedChatId} />
          </div>
          <div className={`w-full md:flex-1 h-full ${selectedChatId ? 'block' : 'hidden md:block'}`}>
          <ChatWindow selectedChatId={selectedChatId} onBack={() => setSelectedChatId(null)} />
        </div>
      </div>
    </div>
  )
}

export default ChatLayout
