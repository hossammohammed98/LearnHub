import Image from 'next/image';
import React from 'react'
interface ConversationItemProps{
    userName:string;
    imgUrl?:string;
    lastMessage:string;
    time:string;
    active?:boolean;
    onClick:()=>void;
}
function ConversationItem({userName='احمد حسن',imgUrl='/images/login.jpg',lastMessage='ايه الاخبار',time='الان',active=false,onClick}:ConversationItemProps) {
  return (
    <div onClick={onClick}
     className={`mx-2 p-3 flex items-center gap-3 rounded-xl cursor-pointer transition-colors ${
      active ? 'bg-emerald-50/60' : 'hover:bg-slate-50'
    }`}>
      <div className='relative w-12 h-12 flex-shrink-0'>
        <Image 
          alt={userName} 
          src={imgUrl} 
          fill
          className='rounded-xl object-cover' 
        />
      </div>  الكيمياء
      <div className='flex-1 min-w-0'>
          <div className='flex justify-between items-baseline mb-1'>
            <h2 className={`text-sm font-semibold truncate ${active ? 'text-[#006C49]' : 'text-slate-800'}`}
            >{userName}</h2>
            <span className='text-xs text-slate-400 whitespace-nowrap'>{time}</span>
          </div>
         
        <p className='text-xs text-slate-500 truncate'>{lastMessage}</p>
          
      </div>
    </div>
  )
}

export default ConversationItem
