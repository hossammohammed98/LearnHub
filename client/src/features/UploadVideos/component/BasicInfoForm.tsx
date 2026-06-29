"use client";

import { Info } from "lucide-react";

export default function BasicInfoForm() {
  return (
    <div dir="rtl" className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-5 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-gray-900">
          المعلومات الأساسية
        </h3>
        <Info className="h-4 w-4 text-gray-400" />
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="course-title"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            عنوان الدورة
          </label>
          <input
            id="course-title"
            type="text"
            placeholder="مثال: أساسيات التصميم المعماري"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="course-level"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              المستوى
            </label>
            <select
              id="course-level"
              defaultValue="مبتدئ"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
            >
              <option value="مبتدئ">مبتدئ</option>
              <option value="متوسط">متوسط</option>
              <option value="متقدم">متقدم</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="course-category"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              التصنيف
            </label>
            <select
              id="course-category"
              defaultValue="برمجة"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
            >
              <option value="برمجة">برمجة</option>
              <option value="تصميم">تصميم</option>
              <option value="أعمال">أعمال</option>
              <option value="لغات">لغات</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="course-description"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            وصف الدورة
          </label>
          <textarea
            id="course-description"
            rows={4}
            placeholder="اكتب وصفاً شاملاً لأهداف الدورة وما سيتعلمه الطلاب..."
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>
    </div>
  );
}