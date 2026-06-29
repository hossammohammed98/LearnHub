'use client'
import SideBar from '@/components/common/SideBar'
import React, { useState } from 'react'
import ChatSideBar from './ChatSideBar'
import ChatWindow from './ChatWindow'

interface ChatDetails {
  userName: string;
  imgUrl: string;
  active?: boolean;
}

function ChatLayout() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedChatDetails, setSelectedChatDetails] = useState<ChatDetails | null>(null);

  // Updates both pieces of state simultaneously when a user clicks a room card row
  const handleSelectChat = (id: string, details: ChatDetails) => {
    setSelectedChatId(id);
    setSelectedChatDetails(details);
  };

  const handleBack = () => {
    setSelectedChatId(null);
    setSelectedChatDetails(null);
  };

  return (
    <div className='flex h-screen w-full overflow-hidden bg-[#F8FAFC]' dir="rtl">
      <div className={`md:block h-full`}>
        <SideBar />
      </div>
      <div className='flex flex-1 overflow-hidden'>
        {/* Sidebar Panel Navigation wrapper */}
        <div className={`w-full md:w-80 h-full flex-shrink-0 ${selectedChatId ? 'hidden md:block' : 'block'}`}>
          <ChatSideBar 
            onSelectChat={handleSelectChat} 
            selectedChatId={selectedChatId} 
          />
        </div>
        
        {/* Main Workspace Frame container */}
        <div className={`w-full md:flex-1 h-full ${selectedChatId ? 'block' : 'hidden md:block'}`}>
          <ChatWindow 
            selectedChatId={selectedChatId} 
            selectedChatDetails={selectedChatDetails} 
            onBack={handleBack} 
          />
        </div>
      </div>
    </div>
  )
}

export default ChatLayout;