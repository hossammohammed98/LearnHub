import React from 'react';
import Link from 'next/link';
import { FiActivity } from 'react-icons/fi';

export interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  time: string;
  status: 'مكتمل' | 'قيد المراجعة';
}

const defaultActivities: ActivityItem[] = [
  {
    id: '1',
    user: { name: 'سارة محمد', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    action: 'تسجيل في دورة: تصميم UI',
    time: 'منذ ساعتين',
    status: 'مكتمل'
  },
  {
    id: '2',
    user: { name: 'د. إبراهيم خليل', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
    action: 'رفع محتوى تعليمي جديد',
    time: 'منذ 5 ساعات',
    status: 'مكتمل'
  },
  {
    id: '3',
    user: { name: 'ياسمين علي', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
    action: 'طلب استعادة كلمة المرور',
    time: 'أمس، 10:30 م',
    status: 'قيد المراجعة'
  }
];

export const RecentActivities: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-slate-800 font-bold">
          <FiActivity className="w-5 h-5 text-teal-600" />
          <span>النشاطات الأخيرة</span>
        </div>
        <Link href="/admin" className="text-teal-600 hover:text-teal-700 text-sm font-semibold transition-colors">
          عرض الكل
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 text-sm font-medium">
              <th className="pb-3 font-semibold">اسم المستخدم</th>
              <th className="pb-3 font-semibold">الإجراء</th>
              <th className="pb-3 font-semibold text-left pl-4">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {defaultActivities.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.user.avatar} 
                      alt={item.user.name} 
                      className="w-10 h-10 rounded-full object-cover border border-gray-100"
                    />
                    <span className="font-semibold text-slate-800 text-sm">{item.user.name}</span>
                  </div>
                </td>
                <td className="py-4">
                  <p className="text-slate-700 font-medium text-sm">{item.action}</p>
                  <span className="text-xs text-gray-400 block mt-0.5">{item.time}</span>
                </td>
                <td className="py-4 text-left pl-2 whitespace-nowrap">
                  <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full ${
                    item.status === 'مكتمل' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};