"use client";

import { ChevronLeft } from "lucide-react";

export default function Breadcrumb() {
  return (
    <nav dir="rtl" aria-label="مسار التنقل" className="flex items-center gap-2 text-sm">
      <a href="#" className="text-gray-500 transition hover:text-gray-700">
        الرسائل
      </a>
      <ChevronLeft className="h-4 w-4 text-gray-400" />
      <span className="font-medium text-gray-900">إدارة المساعدين</span>
    </nav>
  );
}