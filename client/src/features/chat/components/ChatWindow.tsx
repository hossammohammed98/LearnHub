import React from 'react'
import ChatHeader from './ChatHeader'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
interface ChatWindowProps {
    selectedChatId: string | null;
    onBack: () => void;
}
function ChatWindow({ selectedChatId, onBack }: ChatWindowProps) {
    if (!selectedChatId) {
        return (
            <div className='hidden md:flex flex-1 h-full items-center justify-center bg-[#F4F7F9]'>
                <p className='text-slate-400 font-medium'>اختر محادثة لبدء المراسلة</p>
            </div>
        )
    }
    return (

        <div className='flex-1 flex flex-col h-full bg-[#F4F7F9]'>
            <ChatHeader userName="أ. أحمد الشناوي" imgUrl="/images/login.jpg" active={true} onBack={onBack} />
            <div className='flex-1 overflow-y-auto p-6 flex flex-col gap-4'>
                <MessageBubble messageText="السلام عليكم يا بطل، كيف حالك؟" myMessage={false} time="١٠:١٥ ص" imgUrl="/images/login.jpg" />
                <MessageBubble messageText="وعليكم السلام يا مستر. الحمد لله، بدأت فيها بالفعل" myMessage={true} time="١٠:١٧ ص" />
            </div>
            <ChatInput placeholder="اكتب رسالتك هنا..." />
        </div>
    )
}

export default ChatWindow
