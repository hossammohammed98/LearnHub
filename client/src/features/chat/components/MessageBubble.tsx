import Image from 'next/image';
import React from 'react'
import AttachmentMessage from './AttachmentMessage';
interface MessageBubbleProps {
    id?: string;
    messageText: string;
    time?: string;
    imgUrl?: string;
    myMessage: boolean;
    type?: 'text' | 'file';
    fileUrl?: string;
}
function MessageBubble({ messageText, time = '3.30 pm', imgUrl, myMessage = true, type = 'text', fileUrl }: MessageBubbleProps) {
    const isFile = type === 'file' && fileUrl;
    return (
        <div className={`flex items-end gap-2 max-w-[75%] ${myMessage ? 'self-start flex-row' : 'self-end flex-row-reverse'}`}>
            {!myMessage && imgUrl && (
                <div className='relative w-8 h-8 flex-shrink-0'>
                    <Image src={imgUrl} alt="Avatar" fill className='rounded-full object-cover' />
                </div>
            )}
            <div className="flex flex-col gap-1">
                {isFile ? (
                    <AttachmentMessage
                        fileName={messageText.replace('📎 ملف مرفق: ', '')}
                        fileUrl={fileUrl}
                        myMessage={myMessage}
                    />
                ) : (
                    <div className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-medium leading-relaxed ${myMessage
                            ? 'bg-[#006C49] text-white rounded-br-none text-right'
                            : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none text-right'
                        }`}>
                        {messageText}
                    </div>
                )}

                <span className={`text-[10px] text-slate-400 font-medium ${myMessage ? 'text-left' : 'text-right'}`}>
                    {time}
                </span>
            </div>
        </div>
    )
}

export default MessageBubble
