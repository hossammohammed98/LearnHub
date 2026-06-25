import { BookAIcon } from 'lucide-react';
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number; 
  tag?: string|React.ReactNode;           
  tagType?: 'success' | 'danger' | 'info';
  iconType?: 'success' | 'danger' | 'info';
  icon: React.ReactNode;
}

export default function MetricCard({
  title='اجمالى الدورات',
  value=8,
  tag='+2 جديد',
  tagType,
  iconType='success',
  icon=<BookAIcon></BookAIcon>
}: MetricCardProps) {
  
  const tagStyles = {
    success: 'bg-[#006C49] text-white',
    danger: 'bg-[#BA1A1A] text-white',
    info: 'bg-[#6CF8BB] text-[#00714D] border-[#6CF8BB]',
  };
    const iconStyles = {
    success: 'bg-[#6CF8BB] text-[#00714D]',
    danger: 'bg-[#FFDAD6] text-[#93000A]',
    info: 'bg-[#1E293B] text-[#8590A6] border-[#1E293B]',
  };
  
  return (
    <div className="flex flex-col flex-1  min-w-[14rem] bg-white rounded-xl border border-[#EDF2F7] p-6 gap-4 shadow-[0_2px_4px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between w-full">
        <div className={`p-2.5 ${iconStyles[iconType]} rounded-md  flex items-center justify-center`}>
          {icon}
        </div>
       
         {tag && (
          (typeof tag === "string") && tagType ? (
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${tagType&&(tagStyles[tagType])}`}>
              {tag}
            </span>
          ) : (
            <div className="">{tag}</div>
          )
        )}
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <p className="text-sm font-medium text-[#718096] text-neutral-500">
          {title}
        </p>
        <p className="text-2xl font-bold text-primary tracking-tight">
          {value}
        </p>
      </div>
      
    </div>
  );
}