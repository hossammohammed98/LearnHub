import React, { InputHTMLAttributes } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?:string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label,error, type = "text", ...props },ref)=> {
  return (
    <div className="flex flex-col gap-1 w-full text-right">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
      ref={ref}
        type={type}
        className={`w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-600 focus:bg-white transition-all text-right"
        ${error 
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
              : "border-slate-200 focus:border-brand-success focus:ring-1 focus:ring-brand-success"
          }`}
        {...props}
      />
      {error && (
          <span className="text-[11px] font-medium text-red-500 mt-0.5">
            {error}
          </span>
        )}
    </div>
  );
}
);
Input.displayName = "Input";