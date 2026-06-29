
import Link from 'next/link';
import React from 'react';
import { FiSearch, FiBell, FiSettings, FiHelpCircle } from 'react-icons/fi';

interface NavbarProps {
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
}

export default function NavbarAdmin({
  userName = "أحمد محمود",
  userRole = "مسؤول النظام",
  avatarUrl = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120",
}: NavbarProps) {
  return (
    <nav className="w-full h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between" dir="rtl">
      
      {/* Right Side: Search Input */}
      <div className="w-full max-w-md relative">
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
          <FiSearch className="text-lg" />
        </div>
        <input
          type="text"
          placeholder="بحث في النظام..."
          className="w-full h-11 bg-slate-100/80 pr-12 pl-4 rounded-xl text-sm text-slate-700 outline-none placeholder-slate-400 focus:bg-slate-100 transition-colors"
        />
      </div>

      {/* Left Side: Profile & Global Actions */}
      <div className="flex items-center gap-6">
        
        {/* User Info & Avatar */}
        <Link href="/settings" className="flex items-center gap-3 transition hover:opacity-90">
          <div className="relative w-11 h-11 rounded-full border-2 border-emerald-500 p-[2px]">
            <img
              src={avatarUrl}
              alt={userName}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col text-right">
            <span className="text-sm font-bold text-slate-800 leading-tight">
              {userName}
            </span>
            <span className="text-xs text-slate-400 mt-0.5">
              {userRole}
            </span>
          </div>
        </Link>

        {/* Vertical Separator Divider */}
        <div className="h-8 w-[1px] bg-slate-200" />

        {/* Utility Action Icons */}
        <div className="flex items-center gap-4 text-slate-500">
          
          {/* Help Button */}
          <Link href="/chat" className="p-2 hover:bg-slate-50 rounded-lg text-xl transition-colors" title="المساعدة" aria-label="المساعدة">
            <FiHelpCircle />
          </Link>

          {/* Settings Button */}
          <Link href="/settings" className="p-2 hover:bg-slate-50 rounded-lg text-xl transition-colors" title="الإعدادات" aria-label="الإعدادات">
            <FiSettings />
          </Link>

          {/* Notification Button with Badge */}
          <button className="p-2 hover:bg-slate-50 rounded-lg text-xl transition-colors relative" title="الإشعارات">
            <FiBell />
            {/* Red Alert Dot */}
            <span className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
          
        </div>

      </div>
    </nav>
  );
}