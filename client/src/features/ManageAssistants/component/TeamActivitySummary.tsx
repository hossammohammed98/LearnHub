"use client";

import { BarChart3, TrendingUp, Minus } from "lucide-react";

type Stat = {
  label: string;
  value: string;
  trend: string;
  direction: "up" | "flat";
};

const stats: Stat[] = [
  { label: "طلاب متابعون", value: "142", trend: "+8%", direction: "up" },
  { label: "اختبارات منشأة", value: "12", trend: "مستقر", direction: "flat" },
  { label: "فيديوهات مرفوعة", value: "24", trend: "+12%", direction: "up" },
];

export default function TeamActivitySummary() {
  return (
    <div dir="rtl" className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
          ملخص نشاط الفريق
        </h3>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
          <BarChart3 className="h-4 w-4" />
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-gray-50 p-3 text-center sm:p-4"
          >
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
              {stat.value}
            </p>
            <p
              className={`mt-1 flex items-center justify-center gap-1 text-xs font-medium ${
                stat.direction === "up" ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {stat.direction === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <Minus className="h-3 w-3" />
              )}
              {stat.trend}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}