import React from 'react';

export type ButtonVariant = 'primary' | 'danger' | 'warning' | 'accent' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[#006C49] text-white hover:bg-[#005438] active:bg-[#00402a] focus-visible:ring-[#006C49]',
    danger: 'bg-[#BA1A1A] text-white hover:bg-[#931313] active:bg-[#730d0d] focus-visible:ring-[#BA1A1A]',
    warning: 'bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800 focus-visible:ring-amber-600',
    accent: 'bg-[#6CF8BB] text-[#003924] hover:bg-[#4be5a4] active:bg-[#39cb8f] focus-visible:ring-[#6CF8BB]',
    outline: 'bg-transparent text-[#006C49] border border-[#006C49] hover:bg-[#006C49]/5 active:bg-[#006C49]/10',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs font-medium rounded-lg',
    md: 'px-5 py-3 text-sm font-semibold rounded-xl', 
    lg: 'px-7 py-4 text-base font-semibold rounded-xl',
  };

  return (
    <button
      disabled={disabled}
      className={`
        inline-flex 
        justify-center 
        items-center 
        font-medium
        transition-all
        duration-200
        select-none
        outline-none
        focus-visible:ring-2
        focus-visible:ring-offset-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:bg-inherit
        ${variantStyles[variant]} 
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}