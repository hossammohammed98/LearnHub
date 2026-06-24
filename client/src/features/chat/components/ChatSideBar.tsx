import SearchBar from '@/components/ui/SearchBar'
import React from 'react'
import ConversationList from './ConversationList'
import ConversationItem from './ConversationItem'
interface ChatSideBarProps {
  onSelectChat: (id: string) => void;
  selectedChatId: string | null;
}
function ChatSideBar({onSelectChat,selectedChatId}:ChatSideBarProps) {
  return (
    <div className='w-58 md:w-80 border-l border-slate-100 bg-white flex flex-col h-full'>
      <div className='p-4 border-b border-slate-50 flex flex-col gap-3'>
        <h1 className='text-xl font-bold text-slate-800'>المحادثات</h1>
        <SearchBar placeholder='البحث عن محادثات أو معلمين...' />
      </div>
      <ConversationList>
        <ConversationItem userName="أ. أحمد الشناوي" lastMessage="هل قمت بمراجعة درس الفيزياء؟" time="الآن" active={selectedChatId==='1'}  onClick={()=>onSelectChat('1')}/>
        <ConversationItem userName="مجموعة الكيمياء" lastMessage="محمد: شكراً جزيلاً يا شباب" time="١٢:٢٥ ص" active={selectedChatId==='2'}  onClick={()=>onSelectChat('2')}/>
        <ConversationItem userName="أ. سارة محمود" lastMessage="تم قبول طلبك للانضمام للدورة" time="أمس" active={selectedChatId==='3'} onClick={()=>onSelectChat('3')}/>
      </ConversationList>
    </div>
  )
}

export default ChatSideBar
