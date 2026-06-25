import React from "react";

interface ActivityCardProps {
  title: string;
  description: string;
  linkText: string;
  onLinkClick?: () => void;
}

export function ActivityCard({
  title = "نشاط هذا الاسبوع",
  description = "أبنائك أكملوا 12 درساً جديداً اليوم",
  linkText = "تصفح الإنجازات",
  onLinkClick,
}: ActivityCardProps) {
  return (
    <div className="bg-[#1E2638] text-white p-6 rounded-2xl flex flex-col justify-between min-h-[200px] w-full">
      <div>
        <h3 className="text-gray-400 text-xs font-semibold tracking-wide">
          {title}
        </h3>

        <p className="text-xl font-bold mt-4 leading-relaxed text-gray-100">
          {description}
        </p>
      </div>

      <div className="mt-6 self-start">
        <button
          onClick={onLinkClick}
          className="text-[#00E5A3] hover:text-[#00c289] text-sm font-bold transition-colors flex flex-col items-start gap-1 group"
        >
          <span>{linkText}</span>
          <hr className="w-12 border-[#00E5A3] border-t-2 opacity-80 group-hover:w-full transition-all duration-300" />
        </button>
      </div>
    </div>
  );
}
