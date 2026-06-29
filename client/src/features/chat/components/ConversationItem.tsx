"use client";
import Image from 'next/image';
import React from 'react';

interface ConversationItemProps {
  userName?: string;
  imgUrl?: string;
  lastMessage?: string;
  time?: string;
  active?: boolean;
  onClick: () => void;
}

function ConversationItem({
  userName,
  imgUrl,
  lastMessage,
  time,
  active = false,
  onClick,
}: ConversationItemProps) {
  
  const displayName = userName && userName.trim() !== "" ? userName : "مستخدم غير معروف";
  const displayImage = imgUrl && imgUrl.trim() !== "" ? imgUrl : "/images/login.jpg";
  const displayMessage = lastMessage && lastMessage.trim() !== "" ? lastMessage : "لا توجد رسائل";
  const displayTime = time && time.trim() !== "" ? time : "الآن";

  return (
    <div 
      onClick={onClick}
      className={`mx-2 p-3 flex items-center gap-3 rounded-xl cursor-pointer transition-colors ${
        active ? 'bg-emerald-50/60' : 'hover:bg-slate-50'
      }`}
    >
      {/* Avatar Container */}
      <div className='relative w-12 h-12 flex-shrink-0'>
        <Image 
          alt={displayName} 
          src={displayImage} 
          fill
          sizes="48px" 
          className='rounded-xl object-cover' 
        />
      </div>

      {/* Text Blocks */}
      <div className='flex-1 min-w-0 text-right'>
        <div className='flex justify-between items-baseline mb-1 gap-2'>
          <h2 className={`text-sm font-semibold truncate ${active ? 'text-[#006C49]' : 'text-slate-800'}`}>
            {displayName}
          </h2>
          <span className='text-xs text-slate-400 whitespace-nowrap'>
            {displayTime}
          </span>
        </div>
         
        <p className='text-xs text-slate-500 truncate'>
          {displayMessage}
        </p>
      </div>
    </div>
  );
}

export default ConversationItem;