'use client'
import React, { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import { useChatRoom } from '../hooks/useChatRoom';

interface ChatWindowProps {
    selectedChatId: string | null;
    chatName: string;
    chatImg: string;
    onBack: () => void;
}

function ChatWindow({ selectedChatId, chatName, chatImg, onBack }: ChatWindowProps) {
    const {
        messages,
        isLoading,
        uploadProgress,
        sendTextMessage,
        sendFileMessage
    } = useChatRoom(selectedChatId);

    const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (scrollAnchorRef.current) {
            scrollAnchorRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    if (!selectedChatId) {
        return (
            <div className='hidden md:flex flex-1 h-full items-center justify-center bg-[#F4F7F9]'>
                <p className='text-slate-400 font-medium'>اختر محادثة لبدء المراسلة</p>
            </div>
        )
    }

    return (
        <div className='flex-1 flex flex-col h-full bg-[#F4F7F9]'>
            {/* Dynamic Context Header parameters mapped seamlessly */}
            <ChatHeader
                userName={chatName}
                imgUrl={chatImg}
                active={true}
                onBack={onBack}
            />

            <div className='flex-1 overflow-y-auto p-6 flex flex-col gap-4'>
                {isLoading ? (
                    <div className="flex flex-col flex-1 items-center justify-center gap-2 text-slate-400 text-sm">
                        <span className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></span>
                        <span>جاري تحميل الرسائل...</span>
                    </div>
                ) : (
                    messages.map((msg: any) => {
                        let formattedTime = "";
                        if (msg.createdAt) {
                            formattedTime = new Date(msg.createdAt).toLocaleTimeString('ar-EG', {
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                        }
                        console.log("🕵️‍♂️ RAW MESSAGE OBJECT FROM BACKEND:", msg);
                        return (
                            <MessageBubble
                                key={msg._id || msg.id}
                                messageText={msg.content || ""}
                                myMessage={msg.myMessage}
                                time={msg.time || formattedTime}
                                imgUrl={msg.Avatar || "/images/login.jpg"}

                                // 🎯 FIXED: Access keys directly from the nested attachment object!
                                type={msg.messageType} // This is exactly "file"
                                fileUrl={msg.attachment?.fileUrl} // Safely reads from msg.attachment.fileUrl
                            />
                        );
                    })
                )}

                {uploadProgress > 0 && (
                    <div className="self-start bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl px-4 py-2 text-xs flex items-center gap-3 shadow-sm animate-pulse">
                        <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-ping" />
                        <span>جاري رفع الملف المرفق...</span>
                        <span className="font-bold">{uploadProgress}%</span>
                    </div>
                )}

                <div ref={scrollAnchorRef} />
            </div>

            <ChatInput
                placeholder="اكتب رسالتك هنا..."
                onSendText={sendTextMessage}
                onSendFile={sendFileMessage}
            />
        </div>
    )
}

export default ChatWindow;