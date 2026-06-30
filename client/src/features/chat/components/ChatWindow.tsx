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
                    messages.map((msg: Record<string, unknown>, index: number) => {
                        let formattedTime = "";
                        const createdAt = msg.createdAt;
                        if (typeof createdAt === 'string' || createdAt instanceof Date) {
                            formattedTime = new Date(createdAt).toLocaleTimeString('ar-EG', {
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                        }

                        const normalizedType = (msg.type ?? msg.messageType ?? (msg.fileUrl || (msg.attachment as { fileUrl?: string } | undefined)?.fileUrl ? 'file' : 'text')).toString();
                        const normalizedMessageText = (msg.messageText ?? msg.content ?? (normalizedType === 'file' ? '📎 ملف مرفق' : '')).toString();
                        const normalizedFileUrl = (msg.fileUrl ?? (msg.attachment as { fileUrl?: string } | undefined)?.fileUrl)?.toString();
                        const normalizedFileName = (msg.fileName ?? (msg.attachment as { fileName?: string } | undefined)?.fileName)?.toString();
                        const messageId = (msg.id ?? msg._id ?? `${index}`).toString();
                        const myMessage = Boolean(msg.myMessage);

                        return (
                            <MessageBubble
                                key={messageId}
                                messageText={normalizedMessageText}
                                myMessage={myMessage}
                                time={msg.time?.toString() || formattedTime}
                                imgUrl={(msg.Avatar ?? "/images/login.jpg").toString()}
                                type={normalizedType as 'text' | 'file'}
                                fileUrl={normalizedFileUrl}
                                fileName={normalizedFileName}
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
