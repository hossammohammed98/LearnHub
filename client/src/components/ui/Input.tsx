import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, type = "text", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full text-right">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-600 focus:bg-white transition-all text-right"
        {...props}
      />
    </div>
  );
}