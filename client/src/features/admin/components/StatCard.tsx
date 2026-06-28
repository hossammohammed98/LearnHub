import React from 'react';

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBgColor: string;
  badge?: {
    text: string;
    type: 'success' | 'neutral';
  };
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBgColor, badge }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[160px]">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${iconBgColor}`}>
          {icon}
        </div>
        {badge && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-lg [direction:ltr] ${
            badge.type === 'success' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-500 bg-gray-50'
          }`}>
            {badge.text}
          </span>
        )}
      </div>
      <div className="mt-4 text-right">
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
    </div>
  );
};