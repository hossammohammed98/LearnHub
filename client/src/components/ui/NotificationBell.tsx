'use client'
import {BellDot} from 'lucide-react'
import { useState } from 'react'
function NotificationBell() {
    const [isOpen,setIsOpen]=useState(false);
    return (
        <div className="relative flex items-center justify-center">
            <button
            
                className="p-2 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <BellDot className="w-6 h-6 text-emerald-600 fill-emerald-100" />
            </button>

            {isOpen && (
                <div className="absolute top-14 left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 text-right">
                        <span className="font-bold text-sm text-gray-700">الإشعارات</span>
                    </div>

                    <div className="w-full px-4 py-3 bg-amber-50/50 hover:bg-gray-50 transition-colors text-right cursor-pointer flex flex-col gap-1">
                        <h2 className="text-sm font-semibold text-gray-800">لقد تخطيت المرحلة الأولى 🎉</h2>
                        <span className="text-xs text-gray-400">منذ دقيقة واحدة</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationBell
