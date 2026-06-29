import React from 'react';
import { FiDownload, FiCalendar } from 'react-icons/fi';

export const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="text-right">
        <h1 className="text-3xl font-bold text-slate-900">لوحة تحكم المسؤول</h1>
        <p className="text-gray-500 mt-1">أهلاً بك مجدداً، إليك نظرة سريعة على أداء المنصة التعليمية اليوم.</p>
      </div>
      
      <div className="flex items-center gap-3 self-stretch md:self-auto">
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm">
          <FiCalendar className="w-4 h-4" />
          <span>آخر 30 يوم</span>
        </button>
        <button className="flex items-center gap-2 bg-teal-800 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-teal-950 transition-colors shadow-sm text-sm">
          <FiDownload className="w-4 h-4" />
          <span>تحميل التقرير</span>
        </button>
      </div>
    </div>
  );
};