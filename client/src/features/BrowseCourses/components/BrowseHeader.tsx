"use client";
import Avatar from "@/components/common/Avatar";
import NotificationBell from "@/components/ui/NotificationBell";
import { useState } from "react";

interface BrowseHeaderProps {
  onMenuToggle?: () => void;
}

export default function BrowseHeader({ onMenuToggle }: BrowseHeaderProps) {
  const [query, setQuery] = useState("");

  return (
    <header
      dir="rtl"
      className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:gap-6"
    >
      {/* Right side: nav links with updated active brand color */}
      <nav className="hidden md:flex items-center gap-7">
        <a href="#" className="text-sm font-medium text-gray-500 hover:text-[#006C49] transition-colors">تعلم</a>
        <a href="#" className="text-sm font-medium text-gray-500 hover:text-[#006C49] transition-colors">الرئيسية</a>
        <a href="#" className="border-b-2 border-[#006C49] pb-1 text-sm font-semibold text-[#006C49]">تصفح المسارات</a>
        <a href="#" className="text-sm font-medium text-gray-500 hover:text-[#006C49] transition-colors">المدربين</a>
      </nav>

      {/* Left side: search + bell + avatar + mobile hamburger */}
      <div className="flex flex-1 md:flex-none items-center justify-end gap-2 sm:gap-4">
        
        {/* Search input: flexible layout bounds */}
        <div className="relative w-full max-w-[160px] sm:max-w-[256px]">
          <input
            suppressHydrationWarning
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ماذا تريد أن تتعلم اليوم؟"
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pr-4 pl-9 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006C49]/30"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Notification Bell */}
        <NotificationBell />

        {/* Profile Avatar */}
        <button suppressHydrationWarning className="hover:opacity-80 transition-opacity">
          <Avatar src="/avatar-placeholder.png" alt="اسم المستخدم" size="md" />
        </button>

        {/* Mobile Hamburger Menu */}
        <button 
          suppressHydrationWarning
          onClick={() => onMenuToggle?.()} 
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label="Open Menu"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>
    </header>
  );
}