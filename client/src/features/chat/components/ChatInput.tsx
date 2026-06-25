'use client'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { PaperclipIcon, SendHorizonal, SmileIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
interface ChatInputProps {
    placeholder: string;
    onSendText: (text: string) => void;
    onSendFile: (file: File) => Promise<void>;
}
function ChatInput({ placeholder = 'اكتب رسالتك هنا....', onSendFile, onSendText }: ChatInputProps) {
    const [textInput, setTextInput] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const emojiPickerRef = useRef<HTMLDivElement | null>(null);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!textInput.trim()) return;
        onSendText(textInput);
        setTextInput('');
        setShowEmojiPicker(false);
    };
    
    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setTextInput((prev) => prev + emojiData.emoji)
    }
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        const MAX_SIZE_MB = 20 * 1024 * 1024;
        if (selectedFile.size > MAX_SIZE_MB) {
            alert("حجم الملف كبير جداً! الحد الأقصى المسموح به هو 20 ميجابايت.");
            return;
        }
        await onSendFile(selectedFile);
        e.target.value = '';
    }

    useEffect(() => {
        const handelOutsideClick = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        }
        document.addEventListener('mousedown', handelOutsideClick);
        return () => document.removeEventListener('mousedown', handelOutsideClick);
    }, [])
    return (
        <form onSubmit={handleSendMessage} className='p-4 bg-white border-t border-slate-100 flex items-center gap-3 w-full'>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.docx"
            />
            <div ref={emojiPickerRef} className="flex items-center  md:gap-2 flex-shrink-0">
                <button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className={`p-2 rounded-lg transition-colors 
                        ${showEmojiPicker ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                    aria-label="Add emoji"
                >
                    <SmileIcon size={20} className="md:w-[22px] md:h-[22px]" />
                </button>
                {showEmojiPicker && (
                    <div  className="absolute bottom-16 left-auto right-auto z-50 shadow-xl border border-slate-100 rounded-2xl overflow-hidden max-w-[90vw]">
                        <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            theme={Theme.LIGHT}
                            height={380}
                            width={320}
                            searchPlaceholder="ابحث عن إيموجي..."
                            previewConfig={{ showPreview: false }} 
                        />
                    </div>
                )}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    aria-label="Attach file"
                >
                    <PaperclipIcon size={20} className="md:w-[22px] md:h-[22px]" />
                </button>
            </div>
            <input
                type="text"
                value={textInput}
                onChange={(e) => { setTextInput(e.target.value) }}
                className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm outline-none text-right font-medium placeholder-slate-400 focus:border-emerald-500/30 focus:bg-white transition-all min-w-0"
                placeholder={placeholder}
            />

            <button
                type="submit"
                disabled={!textInput.trim()}

                className={`p-2.5 md:p-3 rounded-xl transition-all flex items-center justify-center flex-shrink-0 transform rotate-180 ${textInput.trim()
                    ? 'bg-[#006C49] text-white hover:bg-[#005438] cursor-pointer'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                    }`}
                aria-label="Send message"
            >
                <SendHorizonal size={18} />
            </button>
        </form>
    )
}

export default ChatInput
