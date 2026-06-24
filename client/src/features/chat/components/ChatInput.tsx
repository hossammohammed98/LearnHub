'use client'
import { PaperclipIcon, SendHorizonal, SmileIcon } from 'lucide-react';
import React from 'react'
interface ChatInputProps {
    placeholder: string;
}
function ChatInput({ placeholder = 'اكتب رسالتك هنا....' }: ChatInputProps) {
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSendMessage} className='p-4 bg-white border-t border-slate-100 flex items-center gap-3 w-full'>
            <div className="flex items-center  md:gap-2 flex-shrink-0">
                <button
                    type="button"
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    aria-label="Add emoji"
                >
                    <SmileIcon size={20} className="md:w-[22px] md:h-[22px]" />
                </button>

                <button
                    type="button"
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    aria-label="Attach file"
                >
                    <PaperclipIcon size={20} className="md:w-[22px] md:h-[22px]" />
                </button>
            </div>
            <input
                type="text"
                className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm outline-none text-right font-medium placeholder-slate-400 focus:border-emerald-500/30 focus:bg-white transition-all min-w-0"
                placeholder={placeholder}
            />

            <button
                type="submit"
                className='p-2.5 md:p-3 bg-[#006C49] text-white rounded-xl hover:bg-[#005438] transition-colors flex items-center justify-center flex-shrink-0 transform rotate-180'
                aria-label="Send message"
            >
                <SendHorizonal size={18} />
            </button>
        </form>
    )
}

export default ChatInput
