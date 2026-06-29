'use client'
import SideBar from '@/components/common/SideBar'
import React, { useState } from 'react'
import ChatSideBar from './ChatSideBar'
import ChatWindow from './ChatWindow'

function ChatLayout() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [activeChatName, setActiveChatName] = useState<string>("المحادثة");
  const [activeChatImg, setActiveChatImg] = useState<string>("/images/login.jpg");

  // State coordination engine: catches selection payloads from Sidebar
  const handleSelectChat = (id: string, name: string, img: string) => {
    setSelectedChatId(id);
    setActiveChatName(name);
    setActiveChatImg(img);
  };

  const handleBack = () => {
    setSelectedChatId(null);
  };

  return (
    <div className='flex h-screen w-full overflow-hidden bg-[#F8FAFC]' dir="rtl">
      <div className="hidden md:block h-full">
        <SideBar />
      </div>
      <div className='flex flex-1 overflow-hidden'>
        {/* Navigation Room List Sidebar */}
        <div className={`w-full md:w-80 h-full flex-shrink-0 ${selectedChatId ? 'hidden md:block' : 'block'}`}>
          <ChatSideBar 
            onSelectChat={handleSelectChat} 
            selectedChatId={selectedChatId} 
          />
        </div>
        
        {/* Message Panel Workspace Window */}
        <div className={`w-full md:flex-1 h-full ${selectedChatId ? 'block' : 'hidden md:block'}`}>
          <ChatWindow 
            selectedChatId={selectedChatId} 
            chatName={activeChatName} 
            chatImg={activeChatImg} 
            onBack={handleBack} 
          />
        </div>
      </div>
    </div>
  )
}

export default ChatLayout;