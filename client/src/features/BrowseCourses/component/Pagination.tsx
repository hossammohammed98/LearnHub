import React from "react";

export const Pagination: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8" dir="rtl">
      <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>

      <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-teal-800 text-white font-bold text-sm shadow-sm">
        ١
      </button>

      <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50 font-medium text-sm transition-all">
        ٢
      </button>

      <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50 font-medium text-sm transition-all">
        ٣
      </button>

      <span className="text-gray-400 text-sm px-1">...</span>

      <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50 font-medium text-sm transition-all">
        ١٠
      </button>

      <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button>
    </div>
  );
};
