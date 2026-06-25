import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
interface ChatHeaderProps {
    imgUrl: string;
    userName: string;
    active: boolean;
    onBack: () => void;
}
function ChatHeader({ imgUrl, userName, active, onBack }: ChatHeaderProps) {
    return (
        <div className='w-full h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-10'>
            <div className='flex items-center gap-3'>
                <button
                    onClick={onBack}
                    className='p-1 hover:bg-slate-100 rounded-lg text-slate-600 md:hidden transition-colors'
                    aria-label="Back to conversations"
                >
                    <ArrowRight size={22} />
                </button>
                <div className='relative w-10 h-10'>
                    <Image src={imgUrl} alt={userName} fill className='rounded-full object-cover' />
                    {active && <span className="absolute bottom-0 left-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />}
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-sm font-bold text-slate-800'>{userName}</h2>
                    <span className='text-xs text-slate-400'>
                        {active ? 'نشط الآن' : 'غير نشط'}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
