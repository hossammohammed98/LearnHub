'use client';

import React from 'react';

interface ParentNavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export function ParentNavbar({
  activeTab = 'dashboard',
  onTabChange,
  onNotificationClick,
  onProfileClick,
}: ParentNavbarProps) {
  
  const navItems = [
    { id: 'dashboard', label: 'لوحة القيادة' },
    { id: 'courses', label: 'الدورات' },
    { id: 'messages', label: 'الرسائل' },
  ];

  return (
    <nav 
      className="w-full h-20 bg-[#F4F6F8] backdrop-blur-md px-6 flex items-center justify-between border-b border-gray-100 sticky top-0 z-50 select-none"
      dir="rtl"
    >
      {/* ─── الشق الأيمن: الشعار وروابط التنقل السريع ─── */}
      <div className="flex items-center gap-10">
        {/* الشعار الرئيسي للمنصة */}
        <div className="flex items-center gap-1.5">
          <span className="text-2xl font-black text-gray-900 tracking-tight">تعلّم</span>
          <div className="w-2 h-2 rounded-full bg-[#007A5A] mt-2" />
        </div>

        {/* روابط التنقل السريع */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange?.(item.id)}
                className={`text-sm font-bold relative py-2 transition-colors duration-300 ${
                  isActive ? 'text-[#007A5A]' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {item.label}
                {/* الخط السفلي للمؤشر النشط */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007A5A] rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── الشق الأيسر: شريط البحث، الإشعارات، وملف ولي الأمر ─── */}
      <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
        
        {/* شريط البحث المطور */}
        <div className="relative w-full max-w-md hidden md:block">
          <input
            type="text"
            placeholder="بحث..."
            className="w-full bg-[#EAEFF2] border border-transparent focus:border-gray-200 focus:bg-white text-gray-800 text-sm font-semibold rounded-full py-2.5 pr-11 pl-4 outline-none transition-all duration-300 placeholder-gray-400"
          />
          <div className="absolute inset-y-0 pr-4 right-0 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* زر التنبيهات / الإشعارات */}
        <button 
          onClick={onNotificationClick}
          className="p-2.5 text-gray-500 hover:text-gray-800 bg-transparent rounded-full hover:bg-gray-100 transition-colors relative"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* نقطة الإشعار الحمراء الصغيرة عند الحاجة */}
          <span className="absolute top-2.5 left-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>

        {/* كارت بروفايل ولي الأمر ذو الحواف المستديرة الفاخرة */}
        <button
          onClick={onProfileClick}
          className="flex items-center gap-3 bg-[#EAEFF2] hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full border border-gray-100 transition-all duration-300 group"
        >
          <span className="text-xs font-black text-gray-800 group-hover:text-gray-950">
            ولي الأمر
          </span>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white shadow-sm">
            <img
              src="/parent-avatar.jpg" // استبدلها بمسار الصورة الفعلي لولي الأمر لاحقاً
              alt="صورة ولي الأمر"
              className="w-full h-full object-cover"
              onError={(e) => {
                // صورة احتياطية عند غياب الرابط المباشر
                e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
              }}
            />
          </div>
        </button>

      </div>
    </nav>
  );
}