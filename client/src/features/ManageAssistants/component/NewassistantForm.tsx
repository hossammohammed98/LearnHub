"use client";

import { UserPlus2 } from "lucide-react";

export default function NewAssistantForm() {
  return (
    <div dir="rtl" className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
            إضافة مساعد جديد
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            امنح فريقك الصلاحيات اللازمة للنجاح
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-white">
          <UserPlus2 className="h-5 w-5" />
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="assistant-name"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            الاسم الكامل
          </label>
          <input
            id="assistant-name"
            type="text"
            placeholder="مثلاً: محمد علي"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="assistant-email"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            البريد الإلكتروني
          </label>
          <input
            id="assistant-email"
            type="email"
            dir="ltr"
            placeholder="assistant@educore.com"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>
    </div>
  );
}