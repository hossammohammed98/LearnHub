import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;  
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean; 
}

export default function Progress({
  value = 0,
  max = 100,
  size = 'md',
  showLabel = false,
}: ProgressProps) {
  
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5', 
    lg: 'h-4',
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {showLabel && (
        <div className="flex flex-row-reverse justify-between items-center text-lg font-semibold text-slate-600">
          <span className="text-[#006C49]">{percentage}%</span>
          <span className="text-black">معدل التقدم</span>
        </div>
      )}

      <div className={`w-full bg-[#E6E8EA] rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className="bg-[#006C49] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}