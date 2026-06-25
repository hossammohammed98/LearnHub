"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  updateCoursePrice,
} from "@/features/courses/store/courseSlice";
import { Button } from "@/components/ui/Button"; // import from ui == not working

export default function CreateCoursePage() {
  const dispatch = useDispatch();
  const course = useSelector((state: any) => state.course);

  const handleChange = (field: string, value: any) => {
    dispatch(updateField({ field: field as any, value }));
  };

  const handlePublish = () => {
    alert(
      `تم النشر من !\nالعنوان: ${course.title}\nالصافي: ${course.netProfit} جنيه مصري`,
    );
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6] p-4 md:p-10 font-cairo"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            رفع دورة تدريبية جديدة
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            أكمل الخطوات التالية لنشر محتواك التعليمي للمتعلمين
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            type="button"
            onClick={() => alert("إضافة حصة جديدة")}
          >
            إضافة حصة جديدة
          </Button>

          <Button type="button" variant="outline" onClick={handlePublish}>
            نشر الدورة
          </Button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {/* Right side form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition">
            <h2 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
              المعلومات الأساسية
            </h2>

            {/* Title */}
            <div className="space-y-2 mb-5">
              <label className="text-xs font-semibold text-gray-600">
                عنوان الدورة
              </label>
              <input
                type="text"
                value={course.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="مثال: أساسيات التصميم المعماري"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E]/20 focus:border-[#006A4E] transition"
              />
            </div>

            {/* Category + Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">
                  التصنيف
                </label>
                <select
                  value={course.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#006A4E]/20 focus:border-[#006A4E] transition"
                >
                  <option value="برمجة">برمجه</option>
                  <option value="تصميم">تصميم</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">
                  المستوى
                </label>
                <select
                  value={course.level}
                  onChange={(e) => handleChange("level", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#006A4E]/20 focus:border-[#006A4E] transition"
                >
                  <option value="مبتدئ">مبتدئ</option>
                  <option value="متوسط">متوسط</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">
                وصف الدورة
              </label>
              <textarea
                rows={4}
                value={course.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="اكتب وصفاً شاملاً للدورة..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E]/20 focus:border-[#006A4E] resize-none transition"
              />
            </div>
          </div>
        </div>
        {/* Left side pricing */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition">
            <h2 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
              الإعدادات والأسعار
            </h2>

            <div className="space-y-2 mb-6">
              <label className="text-xs font-semibold text-gray-600">
                سعر الدورة (جنيه مصري)
              </label>

              <input
                type="number"
                value={course.price}
                onChange={(e) =>
                  dispatch(updateCoursePrice(Number(e.target.value)))
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-center focus:outline-none focus:ring-2 focus:ring-[#006A4E]/20 focus:border-[#006A4E] transition"
              />
            </div>

            {/* Profit box */}
            <div className="bg-gradient-to-br from-[#F4FAF8] to-white border border-[#E6F4F0] rounded-2xl p-4 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>العمولة (10%)</span>
                <span className="text-red-500 font-semibold">
                  -{course.commission} ج.م
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-dashed text-[#006A4E] font-bold">
                <span>صافي الربح المتوقع</span>
                <span className="text-base">{course.netProfit} ج.م</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
