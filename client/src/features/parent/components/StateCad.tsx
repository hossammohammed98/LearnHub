import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  badgeText: string;
  badgeType: "trend" | "status";
  progressValue: number;
  icon: React.ReactNode;
  iconBgColor?: string;
}

export function StatCard({
  title = "متوسط درجات الأبناء",
  value = "88.5%",
  badgeType = "trend",
  badgeText = "2.4%",
  progressValue = 75,
  icon = (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  iconBgColor = "bg-indigo-50 text-indigo-600",
}: StatCardProps) {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between min-h-[200px] w-full">
      {/*  الجزء العلوي: الشارة والأيقونة  */}
      <div className="flex justify-between items-start">
        <div>
          <span
            className={
              badgeType === "trend"
                ? "inline-block font-bold text-xs bg-emerald-50 text-emerald-500 px-2 py-1 rounded-lg" // كارت الدرجات (+2.4%)
                : "inline-block font-black text-sm text-[#006644]" // كارت الحضور (ممتاز)
            }
          >
            {badgeText}
          </span>
        </div>

        {/* container الأيقونة */}
        <div
          className={`p-3 rounded-xl flex items-center justify-center ${iconBgColor}`}
        >
          {icon}
        </div>
      </div>

      {/*  الجزء السفلي: النصوص وشريط التقدم  */}
      <div className="mt-4">
        {/* عنوان الإحصائية */}
        <span className="text-gray-400 text-xs font-semibold block mb-1">
          {title}
        </span>

        {/* القيمة الرقمية الكبيرة */}
        <h3 className="text-4xl font-black text-gray-900 tracking-tight">
          {value}
        </h3>

        {/* شريط التقدم (Progress Bar) */}
      </div>
    </div>
  );
}

export default StatCard;
