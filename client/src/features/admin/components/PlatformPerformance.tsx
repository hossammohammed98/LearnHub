import React from 'react';

export const PlatformPerformance: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
      <h4 className="text-slate-800 font-bold text-right mb-6">أداء المنصة</h4>
      
      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="text-emerald-600 font-bold">78%</span>
            <span className="text-gray-500">نسبة الإنجاز التعليمي</span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-teal-700 h-full rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="text-orange-500 font-bold">42%</span>
            <span className="text-gray-500">استهلاك الخادم</span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-orange-400 h-full rounded-full" style={{ width: '42%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};