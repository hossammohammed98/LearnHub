import { BookAIcon } from 'lucide-react';
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number; 
  tag?: string;           
  tagType?: 'success' | 'danger' | 'info';
  icon: React.ReactNode;
}

export default function MetricCard({
  title='اجمالى الدورات',
  value=8,
  tag='+2 جديد',
  tagType = 'info',
  icon=<BookAIcon></BookAIcon>
}: MetricCardProps) {
  
  const tagStyles = {
    success: 'bg-[#E8F5E9] text-[#2E7D32]',
    danger: 'bg-[#FFEBEE] text-[#C62828]',
    info: 'bg-[#E3F2FD] text-[#1565C0]',
  };

  return (
    <div className="flex flex-col w-full max-w-[300px] bg-white rounded-xl border border-[#EDF2F7] p-6 gap-4 shadow-[0_2px_4px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between w-full">
        <div className="p-2.5 bg-[#1E293B] rounded-md text-[#4A5568] flex items-center justify-center">
          {icon}
        </div>
        
        {tag && (
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${tagStyles[tagType]}`}>
            {tag}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <p className="text-sm font-medium text-[#718096] text-neutral-500">
          {title}
        </p>
        <p className="text-2xl font-bold text-[#1A202C] tracking-tight">
          {value}
        </p>
      </div>
      
    </div>
  );
}