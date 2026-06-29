import React from 'react';
import { FiUserPlus, FiFileText, FiRefreshCw } from 'react-icons/fi';

export const QuickActions: React.FC = () => {
  const actions = [
    { text: 'إضافة مستخدم جديد', icon: <FiUserPlus className="w-5 h-5 text-teal-600" /> },
    { text: 'تصدير تقرير شهري', icon: <FiFileText className="w-5 h-5 text-teal-600" /> },
    { text: 'تحديث النظام', icon: <FiRefreshCw className="w-5 h-5 text-teal-600" /> },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-6 justify-end text-slate-800 font-bold">
        <span>إجراءات سريعة</span>
        <span className="text-teal-600">⚡</span>
      </div>
      <div className="space-y-4">
        {actions.map((action, idx) => (
          <button 
            key={idx} 
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-gray-100 text-right group"
          >
            <div className="flex items-center gap-3 flex-row-reverse w-full justify-between">
              <span className="text-gray-600 font-medium group-hover:text-teal-600 transition-colors">
                {action.text}
              </span>
              {action.icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};