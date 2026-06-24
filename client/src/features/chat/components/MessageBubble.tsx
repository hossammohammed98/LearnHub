import Image from 'next/image';
import React from 'react'
interface MessageBubbleProps {
    messageText: string;
    time?: string;
    imgUrl?: string;
    myMessage: boolean;
}
function MessageBubble({ messageText, time = '3.30 pm', imgUrl, myMessage = true }: MessageBubbleProps) {
    return (
        <div className={`flex items-end gap-2 max-w-[75%] ${myMessage ? 'self-start flex-row' : 'self-end flex-row-reverse'}`}>
            {!myMessage && imgUrl && (
                <div className='relative w-8 h-8 flex-shrink-0'>
                    <Image src={imgUrl} alt="Avatar" fill className='rounded-full object-cover' />
                </div>
            )}
            <div className="flex flex-col gap-1">
                <div className={`p-3 rounded-2xl text-sm ${myMessage
                        ? 'bg-[#006C49] text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                    }`}>
                    <p className="leading-relaxed">{messageText}</p>
                </div>
                <span className={`text-[10px] text-slate-400 ${myMessage ? 'text-right' : 'text-left'}`}>{time}</span>
            </div>
        </div>
    )
}

export default MessageBubble
