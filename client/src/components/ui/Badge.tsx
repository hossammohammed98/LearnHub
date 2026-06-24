import React from 'react';
export type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'dark';

interface BadgeProps {
  children: React.ReactNode; 
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export default function Badge({ 
  children, 
  variant = 'neutral', 
  size = 'md' 
}: BadgeProps) {
  
  const variantStyles: Record<BadgeVariant, string> = {
    success: 'bg-[#006C49] text-white border-[#006C49]',
    danger: 'bg-[#BA1A1A] text-white border-[#BA1A1A]',
    warning: 'bg-amber-700 text-white border-amber-200/60',
    info: 'bg-[#6CF8BB] text-[#00714D] border-[#6CF8BB]',
    neutral: 'bg-[#FFFFFF33] text-white border-[#FFFFFF33]',
    dark: 'bg-slate-800 text-slate-100 border-transparent',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-1 text-xs font-semibold',
  };

  return (
    <span
      className={`
        inline-flex 
        items-center 
        justify-center 
        rounded-full 
        border
        tracking-wide
        whitespace-nowrap
        transition-colors
        duration-150
        ${variantStyles[variant]} 
        ${sizeStyles[size]}
      `}
    >
      {children}
    </span>
  );
}